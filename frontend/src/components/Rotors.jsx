import { useState, React } from "react"

const RotorOne = {
    "GREY": 16,
    0: 20, // a
    1: 22, // b
    2: 24, // c
    3: 6, // d
    4: 0, // e
    5: 3, // f
    6: 5, // g
    7: 15, // h
    8: 21, // i
    9: 25, // j
    10: 1, // k
    11: 4, // l
    12: 2, // m
    13: 10, // n
    14: 12, // o
    15: 19, // p
    16: 7, // q
    17: 23, // r
    18: 18, // s
    19: 11, // t
    20: 17, // u
    21: 8, // v
    22: 13, // w
    23: 16, // x
    24: 14, // y
    25: 9, // z
}

const RotorTwo = {
    "GREY": 4,
    0: 0, // a
    1: 9, // b
    2: 15, // c
    3: 2, // d
    4: 25, // e
    5: 22, // f
    6: 17, // g
    7: 11, // h
    8: 5, // i
    9: 1, // j
    10: 3, // k
    11: 10, // l
    12: 14, // m
    13: 19, // n
    14: 24, // o
    15: 20, // p
    16: 16, // q
    17: 6, // r
    18: 4, // s
    19: 13, // t
    20: 7, // u
    21: 23, // v
    22: 12, // w
    23: 8, // x
    24: 21, // y
    25: 18, // z
}

const RotorThree = {
    "GREY": 21,
    0: 19, // a
    1: 0, // b
    2: 6, // c
    3: 1, // d
    4: 15, // e
    5: 2, // f
    6: 18, // g
    7: 3, // h
    8: 16, // i
    9: 4, // j
    10: 20, // k
    11: 5, // l
    12: 21, // m
    13: 13, // n
    14: 25, // o
    15: 7, // p
    16: 24, // q
    17: 8, // r
    18: 23, // s
    19: 9, // t
    20: 22, // u
    21: 11, // v
    22: 17, // w
    23: 10, // x
    24: 14, // y
    25: 12, // z
}

const ReflectorB = {
    0: 24, // a
    1: 17, // b
    2: 20, // c
    3: 7, // d
    4: 16, // e
    5: 18, // f
    6: 11, // g
    7: 3, // h
    8: 15, // i
    9: 23, // j
    10: 13, // k
    11: 6, // l
    12: 14, // m
    13: 10, // n
    14: 12, // o
    15: 8, // p
    16: 4, // q
    17: 1, // r
    18: 5, // s
    19: 25, // t
    20: 2, // u
    21: 22, // v
    22: 21, // w
    23: 9, // x
    24: 0, // y
    25: 19, // z
}

const mappings =  {
    "I": RotorOne,
    "II": RotorTwo,
    "III": RotorThree,
    "B": ReflectorB
}

function modulo(n, x=26) {
    return ((n % x) + x) % x; 
}

const alpha = 'abcdefghijklmnopqrstuvwxyz';

function doEnigma(rot1, rot2, rot3, first, second, third, reflector, word) {
    let output = "";
    function invMapping(rotor) {
        const newRotor = {};
        for (var val in rotor) {
            if (val != "GREY") newRotor[rotor[val]] = val;
        }
        return newRotor;
    }

    function rotateFirst() {
        if (first == rot1["GREY"]) {
            rotateSecond();
        }
        first = ((first + 1) % 26);
    }
    function rotateSecond() {
        if (second == rot2["GREY"]) {
            third = ((third + 1) % 26);
        }
        second = ((second + 1) % 26);
    }

    const iRot1 = invMapping(rot1);
    const iRot2 = invMapping(rot2);
    const iRot3 = invMapping(rot3);

    for (let ind in word) {
        let letter = word[ind];
        if (word.includes(letter)) {
            rotateFirst();
            const starter = alpha.indexOf(letter);

            let p1 = modulo(iRot1[modulo(starter+first)]-first);
            let p2 = modulo(iRot2[modulo(p1+second)]-second);
            let p3 = modulo(iRot3[modulo(p2+third)]-third);
            let p4 = reflector[p3];
            let p5 = modulo(rot3[modulo(p4+third)]-third);
            let p6 = modulo(rot2[modulo(p5+second)]-second);
            let final = modulo(rot1[modulo(p6+first)]-first);

            output += alpha[final];
        }
        else {
            output += letter;
        }
    }
    
    return output;
}


export default function () {
    const [rightRotor, setRightRotor] = useState("I");
    const [middleRotor, setMiddleRotor] = useState("III");
    const [leftRotor, setLeftRotor] = useState("II");
    const [reflector, setReflector] = useState("B");
    const [firstRotation, setFirstRotation] = useState(0);
    const [secondRotation, setSecondRotation] = useState(0);
    const [thirdRotation, setThirdRotation] = useState(0);
    const [word, setWord] = useState("");
    const [output, setOutput] = useState("");
    const [initial, setInitial] = useState("");

    function rotateFirst() {
        if (firstRotation == mappings[rightRotor]["GREY"]) {
            rotateSecond();
        }
        setFirstRotation((val) => ((val + 1) % 26));
    }
    function rotateSecond() {
        if (secondRotation == mappings[middleRotor]["GREY"]) {
            setThirdRotation(val => ((val + 1) % 26));
        }
        setSecondRotation((val) => ((val + 1) % 26));
    }
    function runEnigma() {
        setOutput(doEnigma(mappings[rightRotor], mappings[middleRotor], mappings[leftRotor], firstRotation, secondRotation, thirdRotation, mappings[reflector], word));
    }
    
    function setupRots() {
        setFirstRotation(alpha.indexOf(initial[2]));
        setSecondRotation(alpha.indexOf(initial[1]));
        setThirdRotation(alpha.indexOf(initial[0]));
    }

    return <div className="enigma">
        <input value={word} placeholder="word" onChange={(event) => setWord(event.target.value.toLowerCase())} /><button onClick={runEnigma}>run</button><br />
        <button onClick={() => setThirdRotation((val) => ((val + 1) % 26))}>Rotate left rotor ({leftRotor}). Currently: {thirdRotation}</button>
        <button onClick={rotateSecond}>Rotate middle rotor ({middleRotor}). Currently: {secondRotation}</button>
        <button onClick={rotateFirst}>Rotate right rotor ({rightRotor}). Currently: {firstRotation}</button>
        <h1>{output}</h1>
        <button onClick={() => setOutput("")}>reset</button><br />
        <input placeholder="Left Rotor" value={leftRotor} onChange={(event) => setLeftRotor(event.target.value)} />
        <input placeholder="Middle Rotor" value={middleRotor} onChange={(event) => setMiddleRotor(event.target.value)} />
        <input placeholder="Right Rotor" value={rightRotor} onChange={(event) => setRightRotor(event.target.value)} />
        <input placeholder="Reflector" value={reflector} onChange={(event) => setReflector(event.target.value)} /> <br />
        <input placeholder="Starting position" onChange={(event) => setInitial(event.target.value.toLowerCase())} /> <br />
        <button onClick={setupRots}>Setup</button>

    </div>
}