/**
 * Converts a Google Drive URL to the required format.
 * 
 * @param {string} url - The original Google Drive URL.
 * @returns {string | null} - The converted URL or null if the input URL is invalid.
 */
export default function convertAndUseDriveUrl(url) {
    try {
        // Step 1: Define the regular expression to match the Google Drive URL pattern
        const urlPattern = /^https:\/\/drive\.google\.com\/uc\?id=([\w-]+)$/;

        // Step 2: Execute the regex to extract the file ID from the original URL
        const match = url.match(urlPattern);

        // Step 3: Check if the regex found a match
        if (match && match[1]) {
            // Step 4: Return the correctly formatted URL using the extracted file ID
            return `https://drive.google.com/uc?export=view&id=${match[1]}`;
        } else {
            // Log an error if the URL doesn't match the expected pattern
            console.log("Invalid Google Drive URL format:", url);
            return null;
        }
    } catch (error) {
        // Log any unexpected errors that occur during execution
        console.log("An error occurred while converting the URL:", error);
        alert("url can't be cnverted :"+ error)
        return null;
    }
}
