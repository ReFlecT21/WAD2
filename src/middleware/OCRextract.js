
export const OCRextract = {
    extractCalories: function(text){
        // Define a regular expression pattern to match "Calories" or "Energy" followed by digits
        // const regex = /(?:Energy|Calories|Calory|Caloric|Cal.*?)\s?(\d+)/i;
        const regex = /(?:Energy|Calories|Calory|Caloric|Cal.*?)\s*(\d+(?:\.\s*\d+)?)(?:\s*g)?/i
            
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
        // const regex = /(?:Protein|proteins|prot.*?)\s+(\d+(?:\.\d)?)\s*/i;
        const regex = /(?:Protein|proteins|prot.*?)\s*(\d+(?:\.\s*\d+)?)(?:\s*g)?/i
        
        // Match the pattern in the text
        const match = text.match(regex);
    
        // If a match is found, return the captured digits (protein value)
        if (match && match[1]) {
            return parseFloat(match[1]);
            // return match[1]
        }
    
        // Return null if no match is found
        return null;
    },

    extractFat: function(text) {
        // Define a case-insensitive regular expression pattern to match "Fat" or related synonyms followed by digits
        // const regex = /(?:fa?t.*?)\s+(\d+(?:\.\d)?)\s*/i;
        const regex = /(?:Fat.*?)\s*(\d+(?:\.\s*\d+)?)(?:\s*g)?/i
    
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
        const regex = /(?:carb?o?h?y?d?r?a?t?e?s?.*?)\s*(\d+(?:\.\s*\d+)?)(?:\s*g)?/i


        // const regex = /((?:car\s*b\s*o\s*h\s*y\s*d\s*r\s*a\s*t\s*e\s*s?|car)\s+(\d+(?:\.\d+)?)|(\d+(?:\.\d+)?))/i


    
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
