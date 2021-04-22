const anagramSets = {};
let wordCombinations = [];
let inputWord = '';
const container = document.getElementById('container');


function alphabetize(text) {
    return text.toLowerCase().split("").sort().join("").trim();
}

function getAnagramsOf(text, sameSizeWords){
    let arrayWords = [];
    let word = alphabetize(text);
    for (let i = 0; i < sameSizeWords.length; i++) {
        let wordToCompare = alphabetize(sameSizeWords[i]);
        if(word === wordToCompare) arrayWords.push(sameSizeWords[i]);
    }

    return arrayWords;    
}

function sizeWordsArr(){
    let longestWord = 39;
    let sameSizeWords = [];
    let j = 0;
    while(j < longestWord){
        let sizes = [];
        for (let i = 0; i < palavras.length; i++){
            if(palavras[i].length === j) sizes.push(palavras[i]);
        }
        sameSizeWords.push(sizes);
        j++;
    }
    return sameSizeWords;
}

function alphabetizeArray(sizeArr){
    let copysizeArr = []
    for (let  i = 0; i < sizeArr.length; i++){
        let lin = [];
        for (let  j = 0; j < sizeArr[i].length; j++){
            lin.push(sizeArr[i][j]);
        } 
        copysizeArr.push(lin);
    }    
    for (let i = 0; i < copysizeArr.length; i++) {
        for (let j = 0; j < copysizeArr[i].length; j++) {
            copysizeArr[i][j] = copysizeArr[i][j].toLowerCase().split("").sort().join("").trim();        
        }
    }    
    return copysizeArr;
} 

function takeKeys(array){
    let copySameSizeWord = [...array]  
    copySameSizeWord.sort();
    for (let i = 0; i < copySameSizeWord.length; i++) {
        let atLeastFive = i + 4;
        if(copySameSizeWord[i] === copySameSizeWord[atLeastFive] && !anagramSets.hasOwnProperty(copySameSizeWord[i])){
            anagramSets[copySameSizeWord[i]] = [];            
        }
    }  
    return anagramSets;
}

function searchAnagram (arrSizes, arrNumAlfa){
    for (const anagram in anagramSets) {
        let indexAnagrams = [];
        let sizeAnagram = anagram.length;
        for (let i = 0; i < arrNumAlfa[sizeAnagram].length; i++) {
            if(anagram ===  arrNumAlfa[sizeAnagram][i]){
                indexAnagrams.push(i)
            } 
        }           
        let arrAnagrams = [];
        for (let i = 0; i < indexAnagrams.length; i++) {
            arrAnagrams.push(arrSizes[sizeAnagram][indexAnagrams[i]]);
        }
        anagramSets[anagram].push(arrAnagrams);
    }
    return anagramSets;
}

function transformToArray(){
    let arr = [];
    for (const item in anagramSets) {
        arr.push(Object.values(anagramSets[item]))
    }
    return arr;
}

function arrayToHTML(){
    for (const item in anagramSets) {
        let pItem = document.createElement('p')
        pItem.innerText = `${item}: ${anagramSets[item]}`;
        container.appendChild(pItem);
    }
}

function getSetsOfFiveAnagrams(){
    let arrayWordSizes = sizeWordsArr();
    let alphabetizeArrayWordSizes = alphabetizeArray(arrayWordSizes);
    
    for (let numOfLetters = 0; numOfLetters < alphabetizeArrayWordSizes.length; numOfLetters++) {
        takeKeys(alphabetizeArrayWordSizes[numOfLetters]);
    }

    searchAnagram(arrayWordSizes, alphabetizeArrayWordSizes);
    
    arrayToHTML();

    return transformToArray();
}

function combinationUtil(arr,data,start,end,index,sizeOfCombination) {
    if (index === sizeOfCombination) {
        let combination = [];
        for (let j = 0; j < sizeOfCombination; j++) {
            combination.push(data[j]);
        }
        wordCombinations.push(combination.join(''));
    }

    for (let i = start; i <= end && end - i + 1 >= sizeOfCombination - index; i++){
        data[index] = arr[i];
        combinationUtil(arr, data, i + 1, end, index + 1, sizeOfCombination);
        while (arr[i] === arr[i+1]) i++; 
    }
}
 
function initCombination(arr,n,sizeOfCombination){
    let data = new Array(sizeOfCombination);    

    combinationUtil(arr, data, 0, n-1, 0, sizeOfCombination);   
}
 
function fixWords(str){
    let wordsFixed = str.split(' ').join('');
    wordsFixed = alphabetize(wordsFixed).split('');
    return wordsFixed;
}

function allCombinations(word){
    let arrWords = fixWords(word);
    let sizeArrWords = arrWords.length;
    for (let contWords = 2; contWords < sizeArrWords; contWords++) {        
        initCombination(arrWords, sizeArrWords, contWords);
    }
}

function takeAnagramsOfCombinations(){
    let anagramsOfCombinations = [];
    let arrayWordSizes = sizeWordsArr();
    let alphabetizeArrayWordSizes = alphabetizeArray(arrayWordSizes);
    for (let i = 0; i < wordCombinations.length; i++) {
        let sizeCombination = wordCombinations[i].length;
        for (let j = 0; j < alphabetizeArrayWordSizes[sizeCombination].length; j++) {
            if (wordCombinations[i] === alphabetizeArrayWordSizes[sizeCombination][j]){
                anagramsOfCombinations.push(arrayWordSizes[sizeCombination][j]);
            }
        }
    }
    return anagramsOfCombinations;
}


function joinCombinations(){
    let wordToCompare = inputWord.split(' ').join('').split('');
    let resultAnagram = [];
    let combinations = takeAnagramsOfCombinations();
    for (let i = 0; i < combinations.length; i++) {
        for (let j = i + 1; j < combinations.length; j++) {
            let testAnagram = combinations[i].toLowerCase() + combinations[j].toLowerCase();
            if(testAnagram.length === wordToCompare.length){
                if(verifyAnagram(testAnagram, wordToCompare)){
                    resultAnagram.push(`${combinations[i]} + ${combinations[j]}`);
                }
            }            
        }
    }
    return resultAnagram;
}

function joinThreeCombinations(){
    let wordToCompare = inputWord.split(' ').join('').split('');
    let resultAnagram = [];
    let combinations = takeAnagramsOfCombinations();
    for (let i = 0; i < combinations.length; i++) {
        for (let j = i + 1; j < combinations.length; j++) {
            for (let k = i + 2; k < combinations.length; k++) {
                let testAnagram = combinations[i].toLowerCase() + combinations[j].toLowerCase() + combinations[k].toLowerCase();
                if(testAnagram.length === wordToCompare.length){
                    if(verifyAnagram(testAnagram, wordToCompare)){
                        resultAnagram.push(`${combinations[i]} + ${combinations[j]} + ${combinations[k]}`);
                    }
                }
            }                 
        }
    }
    return resultAnagram;
}

function verifyAnagram(anagram, formatInput){
    let word = [...formatInput];
    for (let j = 0; j < anagram.length; j++) {
        if(word.includes(anagram[j])){
            word.splice(word.indexOf(anagram[j]),1);
        }            
        if(word.length === 0) return true;
    }
    return false
}

function combinationsToHTML(array){
    const result = document.createElement('div');
    for (let i = 0; i < array.length; i++) {
        let pItem = document.createElement('p');
        pItem.innerText = array[i];
        result.appendChild(pItem);    
    }
    container.appendChild(result);
}

const btnFiveAnagrams = document.getElementById('listAnagrams');
btnFiveAnagrams.addEventListener('click',function(){
    container.innerHTML = '';
    getSetsOfFiveAnagrams();
});

const btnTwoWords = document.getElementById('twoWords');
btnTwoWords.addEventListener('click',function(){
    container.innerHTML = '';
    inputWord = document.getElementById('inputTwoWords').value;
    allCombinations(inputWord);
    let arrAllCombination = joinCombinations();
    combinationsToHTML(arrAllCombination);
});

const btnThreeWords = document.getElementById('threeWords');
btnThreeWords.addEventListener('click',function(){
    container.innerHTML = '';
    inputWord = document.getElementById('inputThreeWords').value;
    allCombinations(inputWord);
    let arrAllCombination = joinThreeCombinations();
    combinationsToHTML(arrAllCombination);
});

