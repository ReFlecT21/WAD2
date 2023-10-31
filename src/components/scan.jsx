import React, { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';

export function Scan() {
    useEffect(() => {
        const inputElement = document.getElementById("input-file");
        const inputFile = inputElement; // Create a reference to the file input element

        inputElement.addEventListener("change", async (event) => {
            const imageFile = event.target.files[0];
            if (!imageFile) return;

            // Recognize text from the uploaded image
            const { data: { text } } = await Tesseract.recognize(imageFile, 'eng');

            // Output the recognized text to the console
            console.log(text);
            console.log(typeof text);
        });

        // return () => {
        //     // Clean up the event listener when the component unmounts
        //     inputElement.removeEventListener("change", handleImageChange);
        // };
    }, []);

    const handleImageUpload = () => {
        // Trigger the click event on the file input element
        const inputElement = document.getElementById("input-file");
        inputElement.click();
    };

    return (
        <>
            <input id="input-file" className="d-none" type="file" />
            <button onClick={handleImageUpload} className="homePageBtn">
                Upload
            </button>
        </>
    );
}
