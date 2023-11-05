
export const OCRextract = {
    extractCalories: function(text){
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
        const regex = /(?:carb?o?h?y?d?r?a?t?e?s?.*?)\s*(\d+(?:\.\s*\d+)?)(?:\s*g)?/i

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
