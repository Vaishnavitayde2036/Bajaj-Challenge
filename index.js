// index.js

const express = require('express');
const app = express();

// Middleware to parse JSON bodies. This is crucial for a POST request.
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Define the POST route for /bfhl
app.post('/bfhl', (req, res) => {
    try {
        // Extract the 'data' array from the request body
        const { data } = req.body;

        // --- Input Validation ---
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: 'data' must be an array."
            });
        }

        // --- User Information (as provided) ---
        const user_id = "vaishnavi_tayde_29082025";
        const email = "taydevaishnavi261@gmail.com";
        const roll_number = "22BCY10209";

        // --- Logic to process the array ---
        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let alphabet_string_for_concat = '';

        data.forEach(item => {
            // Check if item is a number (and handle string numbers)
            if (!isNaN(item) && !isNaN(parseFloat(item))) {
                const num = parseFloat(item);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(String(num)); // Store as string
                } else {
                    odd_numbers.push(String(num)); // Store as string
                }
            } 
            // Check if item is an alphabet string
            else if (typeof item === 'string' && /^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase()); // Store uppercase version
                alphabet_string_for_concat += item; // Add to string for later concatenation
            }
            // Otherwise, it's a special character
            else {
                special_characters.push(item);
            }
        });

        // --- Logic for concatenation string ---
        const reversed_alphabets = alphabet_string_for_concat.split('').reverse().join('');
        let concat_string = '';
        for (let i = 0; i < reversed_alphabets.length; i++) {
            if (i % 2 !== 0) { // Alternating caps, starting with lowercase
                concat_string += reversed_alphabets[i].toUpperCase();
            } else {
                concat_string += reversed_alphabets[i].toLowerCase();
            }
        }
        
        // --- Construct the final response object ---
        const response = {
            is_success: true,
            user_id: user_id,
            email: email,
            roll_number: roll_number,
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets,
            special_characters: special_characters,
            sum: String(sum), 
            concat_string: concat_string
        };

        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({
            is_success: false,
            error: error.message
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});