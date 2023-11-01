
export const OCRextract = {
    extractCalories: function(text){
        // Define a regular expression pattern to match "Calories" or "Energy" followed by digits
        const regex = /(?:Energy|Calories|Calory|Caloric|Cal)\s?(\d+)/i;
            
        // Match the pattern in the text
        const match = text.match(regex);

        // If a match is found, return the captured digits (calories)
        if (match && match[1]) {
            return parseInt(match[1]);
        }
        // Return null if no match is found
        return null;
    },

    extractProtein: function (text) {
        // Define a case-insensitive regular expression pattern to match "Protein" or related synonyms followed by digits
        // const regex = /(?:Protein|Proteins|Prot)\s?(\d+(\.\d+)?)(?:\s?g|g\s?)/i;
        // const regex = /(?:Protein|Proteins|Prot)\s?(\d+(\.\d+)?)/i;
        // const regex = /(?:protein|prot[aei]ns|amino acids)\s+(\d+(?:\.\d+)?)/i
        // const regex = /\bprotein\b\s*(\d+(?:\.\d+)?)(?:\s*g)?\s*/i;
        // const regex = /\bprotein\b\s*(\d+(?:\.\d+)?)(?:\s*g)?\s*/i;
        // const regex = /(?:Protein|Prot)\s+(\d+(?:\s*\d*(?:\.\d+)?|\.\d+))\s*/i;
        
        const regex = /(?:Prote?i?n?)\s+(\d+(?:\.\d)?)\s*/i;
    
        // Match the pattern in the text
        const match = text.match(regex);
    
        // If a match is found, return the captured digits (protein value)
        if (match && match[1]) {
            return parseFloat(match[1]);
        }
    
        // Return null if no match is found
        return null;
    },

    extractFat: function(text) {
        // Define a case-insensitive regular expression pattern to match "Fat" or related synonyms followed by digits
        // const regex = /(?:Fat|Fats|fat)\s?(\d+(\.\d+)?)(?:\s?g|g\s?)/i;
        // const regex = /(?:Fat|Fats|fat)\s+(\d+(?:\s*\d*(?:\.\d+)?|\.\d+))\s*/i;

        const regex = /(?:fa?t)\s+(\d+(?:\.\d)?)\s*/i;
    
        // Match the pattern in the text
        const match = text.match(regex);
    
        // If a match is found, return the captured digits (fat value)
        if (match && match[1]) {
            return parseFloat(match[1]);
        }
    
        // Return null if no match is found
        return null;
    },
    
    extractCarbs: function(text) {
        // Define a case-insensitive regular expression pattern to match "Carbohydrates" or related synonyms followed by digits
        // const regex = /(?:Carbohydrates|Carbs|Carbohydrate|Car)\s?(\d+(\.\d+)?)(?:\s?g|g\s?)/i;
        // const regex = /(?:Carbohydrate|Carbs)\s+(\d+(?:\s*\d*(?:\.\d+)?|\.\d+))\s*/i;

        const regex = /(?:car?b?o?h?y?d?r?a?t?e?s?)\s+(\d+(?:\.\d)?)\s*/i;
    
        // Match the pattern in the text
        const match = text.match(regex);
    
        // If a match is found, return the captured digits (carbohydrates value)
        if (match && match[1]) {
            return parseFloat(match[1]);
        }
    
        // Return null if no match is found
        return null;
    }
    
    


}
