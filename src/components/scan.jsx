import React, { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
import { OCRextract } from '../middleware/OCRextract';
import { Button } from 'react-bootstrap';

export function Scan({setScanData,scanData}) {

    // const [scanData, setScanData] = useState({});
    // var scanData = {calories:0, carbs:0, fat:0, protein:0};


    useEffect(() => {
        const inputElement = document.getElementById("input-file");
        const inputFile = inputElement; // Create a reference to the file input element

        const handleChange = async (event) => {
            const imageFile = event.target.files[0];
            if (!imageFile) return;

            // Recognize text from the uploaded image
            const { data: { text } } = await Tesseract.recognize(imageFile, 'eng');

            // Output the recognized text to the console
            // console.log(text);
            // console.log(typeof text);

            // Split the text into lines
            const lines = text.split('\n');

            // Iterate through each line
            console.log("==========new scan==========");

            for (const line of lines) {
                // console.log(line, typeof line, line === protein);
                // console.log(line);

                if (OCRextract.extractCalories(line) !== null) {
                    // if (scanData.calories.flag == false){
                        // setScanData((prev) => ({...prev, calories: OCRextract.extractCalories(line)}));
                        setScanData((prev) => ({...prev, calories: {value: OCRextract.extractCalories(line), flag: true}}))
                    // }

                } else if (OCRextract.extractCarbs(line) !== null) {
                    // if (scanData.carbs.flag == false){
                        // setScanData((prev) => ({...prev, carbs: OCRextract.extractCarbs(line)}));
                        setScanData((prev) => ({...prev, carbs: {value: OCRextract.extractCarbs(line), flag: true}}))
                    // }
                } else if (OCRextract.extractFat(line) !== null) {
                    if (scanData.fat.flag == false){
                        // setScanData((prev) => ({...prev, fat: OCRextract.extractFat(line)}));
                        setScanData((prev) => ({...prev, fat: {value: OCRextract.extractFat(line), flag: true}}))
                    }
                } else if (OCRextract.extractProtein(line) !== null) {
                    // if (scanData.protein.flag == false){
                        // setScanData((prev) => ({...prev, protein: OCRextract.extractProtein(line)}));
                        setScanData((prev) => ({...prev, protein: {value: OCRextract.extractProtein(line), flag: true}}))
                        
                    // }
                }
                
            }
            // console.log(scanData)
            // console.log(OCRextract.extractProtein(protein));
        };

        inputElement.addEventListener("change", handleChange);

        // Clean up the event listener when the component unmounts
        return () => {
            inputElement.removeEventListener("change", handleChange);
        };

    }, []);

    const handleImageUpload = () => {
        // Trigger the click event on the file input element
        const inputElement = document.getElementById("input-file");
        inputElement.click();
    };

    return (
        <>
            <input id="input-file" className="d-none" type="file" />
            <div>
            <Button onClick={handleImageUpload} className="chooseBtn" style={{width:"200px", height:"50px", margin:"0px"}}>
                Upload
            </Button>
            <br></br>
            <br></br>
            <p>Upload any image with a nutritional table <br></br>and we will fill up the form for you</p>

            </div>
        </>
    );
}
