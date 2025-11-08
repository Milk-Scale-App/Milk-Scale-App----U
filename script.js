document.addEventListener('DOMContentLoaded', () => {
    // --- Global Elements ---
    const tableBody = document.getElementById('table-body');
    const ratePerKgInput = document.getElementById('rate-per-kg');
    const finalPriceDisplay = document.getElementById('final-price'); 
    const totalAmountBox = document.querySelector('.total-amount-box'); // Target the box for warning class
    
    // TARGET ELEMENTS FOR DYNAMIC LAYOUT/HEIGHT
    const resultsSection = document.querySelector('.results-section'); 
    
    const totalMilkKgDisplay = document.getElementById('total-milk-kg');
    const totalBadhotriGmDisplay = document.getElementById('total-badhotri-gm');
    
    const combinedTotalValueDisplay = document.getElementById('combined-total-value'); 
    const quantityForRateDisplay = document.getElementById('quantity-for-rate');
    // const rateSectionTitle = document.getElementById('rate-section-title'); // Not used here
    // const combinedLabelDisplay = document.querySelector('.total-combined .combined-label'); // Not used here
    
    // Settings elements
    const settingsModal = document.getElementById('settings-modal');
    const openSettingsBtn = document.getElementById('open-settings-btn');
    const settingsCloseBtn = document.getElementById('settings-close-btn'); 
    const languageSelect = document.getElementById('language-select');
    const helpCenterBtn = document.getElementById('help-center-btn'); // Renamed to Contact Us
    
    // 🔔 NEW: Social Button Elements 
    const whatsappGroupBtn = document.getElementById('whatsapp-group-btn');
    const telegramGroupBtn = document.getElementById('telegram-group-btn');
    const telegramChannelBtn = document.getElementById('telegram-channel-btn');

    // Clear Button Element
    const clearAllBtn = document.getElementById('clear-all-btn'); 
    
    // 🔔 NEW: Add Line Button Element
    const addLineBtn = document.getElementById('add-line-btn');

    // Clear All Modal Elements
    const clearAllModal = document.getElementById('clear-all-modal'); 
    const clearCloseBtn = document.getElementById('clear-close-btn');   
    const clearCancelBtn = document.getElementById('clear-cancel-btn'); 
    const clearConfirmBtn = document.getElementById('clear-confirm-btn'); 

    // Line Delete Elements
    const deleteStartInput = document.getElementById('delete-start-serial'); 
    const deleteEndInput = document.getElementById('delete-end-serial');   
    const deleteLinesBtn = document.getElementById('delete-lines-btn-main'); 

    // Help Center Elements
    const helpCenterModal = document.getElementById('help-center-modal');
    const helpCenterCloseBtn = document.getElementById('help-center-close-btn');
    const helpForm = document.getElementById('help-form');
    const problemDescription = document.getElementById('problemDescription');
    const charCountDisplay = document.getElementById('char-count-display'); 
    const userNameInput = document.getElementById('userName');
    const userEmailInput = document.getElementById('userEmail');
    const userPhoneInput = document.getElementById('userPhone');

    // Custom Alert Modal Elements 
    const errorAlertModal = document.getElementById('error-alert-modal');
    const alertMessageText = document.getElementById('alert-message-text');
    const alertCloseBtn = document.getElementById('alert-close-btn');
    const alertOkBtn = document.getElementById('alert-ok-btn');
    
    // --- Core App Link and Text ---
    // const APP_URL = 'https://your-domain.com/app-apk.apk'; // Not used in this version
    
    // 🔔 NEW: Social Links 
    const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/FVhpiIlJQcjIz29OzwXor4?mode=wwt';
    const TELEGRAM_GROUP_LINK = 'https://t.me/milkscalegroup';
    const TELEGRAM_CHANNEL_LINK = 'https://t.me/milkscaleapp';
    
    // Scrolling animation duration for individual badhotri boxes
    const SCROLL_ANIMATION_DURATION = '13.431s'; 
    
    // --- LAYOUT CONSTANTS ---
    const NBSP = '&nbsp;';
    
    // --- CALCULATION CONSTANTS (⚠️ WARNING LIMITS) ---
    const MAX_DIGITS_SMALL_BOX = 7; // Individual badhotri scrolling
    const MAX_DIGITS_MILK_WARNING = 10; // Total Milk warning (Kg)
    const MAX_DIGITS_BADHOTRI_WARNING = 15; // Total Badhotri warning (Gm)
    const MAX_DIGITS_PRICE_WARNING = 14; // 14 digits max for price (15 will show warning)
    
    // --- Localization/Language Dictionary (✅ Milk Scale App - No Translate) ---
    const translations = {
        hi: {
            // ✅ FIX: app_title को हमेशा "Milk Scale App" रखा गया
            app_title: 'Milk Scale App', 
            serial: 'क्र.सं.', 
            milk_kg: 'दूध (Kg)',
            sample: 'सैंपल',
            badhotri_gm: 'बढ़ोतरी (Gm)',
            total_milk_label: 'कुल दूध',
            total_badhotri_label: 'कुल बढ़ोतरी',
            combined_total_label: 'दूध + बढ़ोतरी = ',
            total_amount_label: 'कुल राशि', 
            settings_title: 'सेटिंग्स',
            change_language_label: 'भाषा बदलें',
            
            // ✅ UPDATED: Help Center -> Contact Us
            contact_us_btn: 'हमसे संपर्क करें', 
            contact_us_title: 'हमसे संपर्क करें',
            
            // ✅ NEW: Social Buttons Text 
            whatsapp_group_btn: 'WhatsApp ग्रुप',
            telegram_group_btn: 'Telegram ग्रुप',
            telegram_channel_btn: 'Telegram चैनल',
            
            placeholder_milk: 'दूध', 
            placeholder_sample: 'सैंपल', 
            placeholder_rate: 'दर', 
            // ✅ UPDATED Alert Message
            alert_message: 'अगली लाइन जोड़ने से पहले पिछली लाइन में दूध या सैंपल का मूल्य दर्ज करें।',
            clear_btn: 'Clear', 
            
            // ✅ NEW: Add Line Button Text 
            add_line_btn: '+',
            
            // CLEAR MODAL KEYS 
            clear_modal_title: 'डेटा साफ़ करें',
            clear_modal_warning: 'क्या आप वाकई में सभी डेटा (दूध, सैंपल और दर) को साफ़ करना चाहते हैं?',
            clear_modal_cancel: 'रद्द करें',
            clear_modal_confirm: 'हाँ, साफ़ करें',
            
            // LINE DELETE KEYS
            delete_lines_label: 'लाइन हटाएँ',
            placeholder_start: 'शुरू',
            placeholder_end: 'अंत',
            separator_to: 'से',
            delete_btn: 'हटाएँ', 
            
            // Large Number Warning
            number_too_large: 'संख्या बहुत बड़ी है', 
            price_too_large: 'राशि बहुत बड़ी है', 

            // Help Center/Contact Us Translations
            form_name_label: 'आपका नाम',
            placeholder_name: 'अपना नाम दर्ज करें', 
            form_email_label: 'ईमेल आई.डी.',
            placeholder_email: 'वैध ईमेल',
            form_phone_label: 'फ़ोन नंबर',
            placeholder_phone: 'वैध फ़ोन नंबर',
            form_problem_label: 'अपनी समस्या का वर्णन करें', 
            placeholder_problem: 'अपनी समस्या का वर्णन करें', 
            form_send_btn: 'भेजें', 
            form_error_no_problem: 'कृपया समस्या का विवरण भरें।',
            email_subject: 'Milk Scale App - सहायता अनुरोध',
            lang_hi: 'हिन्दी', 
            lang_en: 'English',
            alert_ok_btn_text: 'ठीक है',
            
            // 💡 UPDATED: Feedback Message (Based on user request)
            feedback_message_title: '💡 ऐप को और भी बेहतर बनाने में हमारी सहायता करें!',
            feedback_message_body: `
                हम आपके अनुभव को सहज और उत्कृष्ट बनाने के लिए प्रतिबद्ध हैं। यदि आपको ऐप के साथ निम्नलिखित में से कोई भी समस्या आती है:
                <br>
                **कोई तकनीकी समस्या या बग (Bug)**
                <br>
                **किसी अपेक्षित सुविधा का न मिलना**
                <br>
                **या इसे और भी बेहतर बनाने का कोई बेहतरीन और रचनात्मक विचार**
                <br><br>
                तो कृपया बेझिझक हमें बताएं!
                <br><br>
                **🗣️ हमसे जुड़ें:**
                <br>
                **ऐप के भीतर 'हमसे संपर्क करें' (Contact Us) बटन का उपयोग करें।**
                <br>
                **टेलीग्राम या व्हाट्सएप समूह पर हमारे साथ लाइव चैट करें।**
                <br><br>
                हमारी विशेषज्ञ टीम आपके प्रत्येक सुझाव का गहन विश्लेषण और पूरे आदर के साथ मूल्यांकन करती है। यदि आपका विचार हमें पसंद आता है, तो हम उसे शीघ्रता से लागू करने का प्रयास करेंगे, और आवश्यकता होने पर, विस्तृत चर्चा के लिए आपसे संपर्क भी करेंगे।
                <br><br>
                **🏆 आपके योगदान के लिए पुरस्कार:**
                <br>
                यदि आपका विचार कंपनी की आय में वृद्धि करने, मुनाफा बढ़ाने, या राजस्व कमाने का नया तरीका प्रस्तुत करता है, तो आपके इस मूल्यवान योगदान के लिए हम आपको **आकर्षक नकद बोनस (Bonus), विशेष पुरस्कार और सम्मान से पुरस्कृत करेंगे।**
                <br><br>
                हम आपके बहुमूल्य सहयोग की सराहना करते हैं! धन्यवाद।
            `
        },
        en: {
            app_title: 'Milk Scale App', 
            serial: 'Sr.', 
            milk_kg: 'Milk (Kg)',
            sample: 'Sample',
            badhotri_gm: 'Increment (Gm)',
            total_milk_label: 'Total Milk',
            total_badhotri_label: 'Total Increment',
            combined_total_label: 'Milk + Increment = ',
            total_amount_label: 'Total amount', 
            settings_title: 'Settings',
            change_language_label: 'Change Language',
            
            // 🔔 UPDATED: Help Center -> Contact Us
            contact_us_btn: 'Contact Us', 
            contact_us_title: 'Contact Us',
            
            // 🔔 NEW: Social Buttons Text 
            whatsapp_group_btn: 'WhatsApp Group',
            telegram_group_btn: 'Telegram Group',
            telegram_channel_btn: 'Telegram Channel',
            
            placeholder_milk: 'Milk', 
            placeholder_sample: 'Sample', 
            placeholder_rate: 'Rate', 
            alert_message: 'Please enter Milk or Sample value in the previous line before adding the next one.',
            clear_btn: 'Clear', 
            
            // 🔔 NEW: Add Line Button Text 
            add_line_btn: '+',
            
            // CLEAR MODAL KEYS 
            clear_modal_title: 'Clear Data',
            clear_modal_warning: 'Are you sure you want to clear all data (Milk, Sample, and Rate)?',
            clear_modal_cancel: 'Cancel',
            clear_modal_confirm: 'Yes, Clear',
            
            // LINE DELETE KEYS
            delete_lines_label: 'Delete Lines',
            placeholder_start: 'Start',
            placeholder_end: 'End',
            separator_to: 'to',
            delete_btn: 'Delete', 
            
            // Large Number Warning
            number_too_large: 'Number is very large', 
            price_too_large: 'The number is very large', 
            
            // Help Center/Contact Us Translations
            form_name_label: 'Your Name',
            placeholder_name: 'Enter your name', 
            form_email_label: 'Email ID',
            placeholder_email: 'Valid Email',
            form_phone_label: 'Phone Number',
            placeholder_phone: 'Valid Phone Number',
            form_problem_label: 'Describe your problem', 
            placeholder_problem: 'Describe your problem', 
            form_send_btn: 'Send', 
            form_error_no_problem: 'Please fill in the problem description.',
            email_subject: 'Milk Scale App - Help Request',
            lang_hi: 'Hindi', 
            lang_en: 'English',
            alert_ok_btn_text: 'OK',
            
            // 💡 UPDATED: Feedback Message (Based on user request)
            feedback_message_title: '💡 Help Us Make the App Even Better!',
            feedback_message_body: `
                We are committed to making your experience seamless and excellent. If you encounter any of the following issues with the app:
                <br>
                **Any technical issue or bug**
                <br>
                **A missing expected feature**
                <br>
                **Or a fantastic and creative idea to make it even better**
                <br><br>
                Then please do not hesitate to tell us!
                <br><br>
                **🗣️ Connect with Us:**
                <br>
                **Use the 'Contact Us' button within the app.**
                <br>
                **Live chat with us on Telegram or WhatsApp group.**
                <br><br>
                Our expert team thoroughly analyzes and evaluates every suggestion with respect. If we like your idea, we will try to implement it quickly, and if necessary, we will contact you for a detailed discussion.
                <br><br>
                **🏆 Rewards for Your Contribution:**
                <br>
                If your idea presents a new way to increase the company's revenue, boost profits, or generate income, we will **reward your valuable contribution with an attractive cash bonus, special awards, and recognition.**
                <br><br>
                We appreciate your invaluable cooperation! Thank you.
            `
        }
    };
    
    // Custom Alert Function 
    function showAlert(message) {
         alertMessageText.textContent = message;
         errorAlertModal.style.display = 'block';
    }
    
    // --- UTILITY FUNCTIONS (UPDATED FOR FULL BigInt ACCURACY) ---
    
    // Parses number inputs (like Delete Serials) which are small enough
    function parseInputToNumber(value) {
        let cleaned = value.toString().replace(/[eE,]/g, '').replace(/[^0-9.]/g, '');
        if (cleaned.endsWith('.')) {
            cleaned = cleaned.slice(0, -1);
        }
        return parseFloat(cleaned) || 0;
    }
    
    // NEW FUNCTION: Parses MILK/SAMPLE/RATE inputs to BigInt
    // precision: 2 for Milk/Sample (Value * 100), 4 for Rate (Value * 10000)
    function parseInputToBigInt(value, precision = 2) {
        let cleaned = value.toString().replace(/[eE,]/g, '').replace(/[^0-9.-]/g, '');
        
        if (cleaned === '') return 0n; 
        
        const isNegative = cleaned.startsWith('-');
        if (isNegative) cleaned = cleaned.substring(1);

        const parts = cleaned.split('.');
        let integerPart = parts[0] || '0';
        
        // Pad and truncate decimal part based on required precision
        let decimalPart = (parts[1] || '').padEnd(precision, '0').substring(0, precision); 
        
        const bigIntString = integerPart + decimalPart;
        
        try {
             let bigIntValue = BigInt(bigIntString);
             return isNegative ? -bigIntValue : bigIntValue;
        } catch (e) {
             console.error("BigInt conversion failed:", e);
             return 0n;
        }
    }

    /**
     * ✅ MODIFIED FUNCTION: Formats BigInt into a decimal string (BigInt / Divisor)
     */
    function formatBigIntToNumberString(bigIntValue, precision = 2) {
        if (bigIntValue === 0n) return '0';
        
        const divisor = BigInt(10 ** precision); // e.g., 100n for precision 2
        const isNegative = bigIntValue < 0n;
        const absoluteBigInt = isNegative ? -bigIntValue : bigIntValue;
        
        const stringValue = absoluteBigInt.toString();
        
        // Find the index to place the decimal point (precision places from the end)
        const decimalIndex = stringValue.length - precision;

        let result;
        if (decimalIndex <= 0) {
            // Case: < 0.xx, e.g., precision=2, string='5' becomes '0.05'
            result = '0.' + '0'.repeat(precision - stringValue.length) + stringValue;
        } else {
            // Case: normal number
            result = stringValue.slice(0, decimalIndex) + '.' + stringValue.slice(decimalIndex);
        }
        
        // Remove trailing zeros for Milk/Badhotri/Combined (precision 2)
        if (precision === 2) { 
             result = result.replace(/(\.0+|0+)$/, '');
        }
        
        // 🚀 MODIFICATION START (FIXED): Trailing zeros removal for Final Price (precision 4)
        if (precision === 4) { 
             
             if (result.includes('.')) {
                 // दशमलव के बाद के शून्य हटाएँ
                 let parts = result.split('.');
                 parts[1] = parts[1].replace(/0+$/, ''); // 0000 -> ''
                 
                 if (parts[1] === '') {
                     // यदि दशमलव के बाद कुछ नहीं बचा तो दशमलव भी हटा दें
                     result = parts[0]; 
                 } else {
                     // दशमलव और बाकी संख्या जोड़ें
                     result = parts[0] + '.' + parts[1];
                 }
             }
        }
        // 🚀 MODIFICATION END
        
        return isNegative ? `-${result}` : result;
    }
    
    // Toggle Scroll and Highlight Function
    function toggleScrollAndHighlight(event) {
        const badhotriBox = event.currentTarget;
        const scrollingText = badhotriBox.querySelector('.scrolling-text');
        
        if (badhotriBox.classList.contains('static-box')) {
             badhotriBox.classList.add('highlight-border');
             setTimeout(() => {
                 badhotriBox.classList.remove('highlight-border');
             }, 100);
             return;
        }

        const isBorderActive = badhotriBox.classList.contains('highlight-border');
        
        if (isBorderActive) {
            badhotriBox.classList.remove('highlight-border');
            scrollingText.style.animationPlayState = 'running';
            badhotriBox.setAttribute('title', 'Scrolling: Running');
        } else {
            badhotriBox.classList.add('highlight-border');
            scrollingText.style.animationPlayState = 'paused';
            badhotriBox.setAttribute('title', 'Scrolling: Paused (Click to restart)');
        }
    }

    // --- CORE LOGIC (UPDATED FOR BigInt) ---
    // Calculates Badhotri in BigInt units (Gm)
    function calculateBadhotri(sampleBigInt, milkKgBigInt) {
        // sampleBigInt is Sample * 100 (from parseInputToBigInt with precision=2)
        // milkKgBigInt is MilkKg * 100 (from parseInputToBigInt with precision=2)
        
        // Formula: (Sample - 65) * 15 * MilkKg
        
        // Step 1: Sample - 65
        // Sample is BigInt with 2 decimal precision. 65 must also be * 100.
        const SIXTY_FIVE_HUNDRED = 6500n; 
        const sampleValueMinus65 = sampleBigInt - SIXTY_FIVE_HUNDRED; 
        
        // Step 2: sampleValueMinus65 * 15
        const factor15 = sampleValueMinus65 * 15n;
        
        // Step 3: factor15 * MilkKg
        // The intermediate result (factor15) has 2 implied decimals (from sampleBigInt).
        // MilkKg (milkKgBigInt) also has 2 implied decimals.
        // Multiplication result has 4 implied decimals (e.g., Gm * 10000).
        const badhotriGmBigInt_temp = factor15 * milkKgBigInt; 
        
        // Step 4: Divide by 100 * 100 = 10000n.
        // We use standard JS rounding by adding half the divisor (5000n) before division
        const DIVISOR = 10000n;
        const HALF_DIVISOR = 5000n; 
        
        let badhotriGmBigInt;
        if (badhotriGmBigInt_temp >= 0n) {
             badhotriGmBigInt = (badhotriGmBigInt_temp + HALF_DIVISOR) / DIVISOR;
        } else {
             badhotriGmBigInt = (badhotriGmBigInt_temp - HALF_DIVISOR) / DIVISOR;
        }
        
        // The result is an exact integer in Gm.
        return badhotriGmBigInt; 
    }
    
    // NEW FUNCTION: RE-INDEXES SERIAL NUMBERS
    function updateSerialNumbers() {
        const rows = tableBody.querySelectorAll('.input-row');
        rows.forEach((row, index) => {
             const newSerial = index + 1;
             row.dataset.serial = newSerial;
             const serialCell = row.querySelector('.cell:first-child');
             if (serialCell) {
                 serialCell.textContent = newSerial;
             }
        });
    }
    
    // Function: Clear All Inputs
    function clearAllInputs() {
        const allInputs = document.querySelectorAll('.milk-kg-input, .sample-input, #rate-per-kg');
        allInputs.forEach(input => {
            input.value = '';
        });
        
        deleteStartInput.value = '';
        deleteEndInput.value = '';
        
        updateCalculations();
        
        document.querySelectorAll('.badhotri-box').forEach(box => {
            box.classList.remove('highlight-border');
            const scrollingText = box.querySelector('.scrolling-text');
            if (scrollingText) {
                 scrollingText.style.animationPlayState = 'running';
            }
            box.removeAttribute('title');
        });
        
        // ✅ MODIFIED: Ensure table is re-initialized with a single row
        initializeTable(true);
    }

    function updateCalculations() {
        let totalMilkKgBigInt = 0n; // Total Milk in Kg * 100 units 
        let totalBadhotriGmBigInt = 0n; // Total Badhotri in Gm units (BigInt)
        
        const currentLang = languageSelect.value || 'hi';
        const t = translations[currentLang];
        
        // --- Reset Price Warning Class ---
        totalAmountBox.classList.remove('warning-price-large'); 

        const inputRows = tableBody.querySelectorAll('.input-row');
        inputRows.forEach(row => {
            const milkKgInput = row.querySelector('.milk-kg-input');
            const sampleInput = row.querySelector('.sample-input');
            const badhotriBox = row.querySelector('.badhotri-box'); 
            const scrollingText = badhotriBox.querySelector('.scrolling-text');
            
            const milkKgRawValue = milkKgInput.value.trim();
            const sampleRawValue = sampleInput.value.trim();
            
            // Parse inputs as BigInt with 2 decimal precision (Value * 100)
            const milkKgBigInt = parseInputToBigInt(milkKgRawValue, 2); 
            // Sample is typically integer, but handle up to 2 decimals for input flexibility
            const sampleBigInt = parseInputToBigInt(sampleRawValue, 2); 
            
            // ONLY ADD MILK KG TO TOTAL MILK if the input is non-empty
            if (milkKgRawValue !== '') {
                 totalMilkKgBigInt += milkKgBigInt;
            }
            
            if (milkKgRawValue === '' || sampleRawValue === '') {
                scrollingText.textContent = '---';
                badhotriBox.classList.add('static-box');
                badhotriBox.classList.remove('positive', 'negative', 'highlight-border'); 
                scrollingText.style.animation = 'none'; 
                return; 
            }

            // Badhotri is calculated in exact Gm units (BigInt)
            const badhotriGmBigInt = calculateBadhotri(sampleBigInt, milkKgBigInt); 
            
            const badhotriGmDisplay = badhotriGmBigInt.toString();
            scrollingText.innerHTML = `${badhotriGmDisplay}${NBSP}Gm`; 
            
            badhotriBox.classList.remove('positive', 'negative', 'static-box'); 
            
            const rawDisplayValue = badhotriGmDisplay;
            
            if (badhotriGmBigInt === 0n) {
                 scrollingText.textContent = '---';
                 badhotriBox.classList.add('static-box'); 
                 scrollingText.style.animation = 'none'; 
                 badhotriBox.classList.remove('highlight-border'); 
            } else {
                 if (badhotriGmBigInt > 0n) {
                    badhotriBox.classList.add('positive');
                } else if (badhotriGmBigInt < 0n) { 
                    badhotriBox.classList.add('negative'); 
                }
                
                if (rawDisplayValue.replace('-', '').length > MAX_DIGITS_SMALL_BOX) { 
                    badhotriBox.classList.remove('static-box'); 
                    scrollingText.style.animation = `marquee-badhotri ${SCROLL_ANIMATION_DURATION} linear infinite`;
                    
                    if (badhotriBox.classList.contains('highlight-border')) {
                         scrollingText.style.animationPlayState = 'paused'; 
                         badhotriBox.setAttribute('title', 'Scrolling: Paused (Click to restart)');
                    } else {
                         scrollingText.style.animationPlayState = 'running'; 
                         badhotriBox.removeAttribute('title');
                    }
                } else {
                    badhotriBox.classList.add('static-box');
                    scrollingText.style.animation = 'none'; 
                    scrollingText.style.animationPlayState = ''; 
                    badhotriBox.classList.remove('highlight-border'); 
                    badhotriBox.removeAttribute('title');
                }
                
                totalBadhotriGmBigInt += badhotriGmBigInt;
            }
        });
        
        // --- TOTAL CALCULATIONS & LAYOUT LOGIC ---
        
        // 1. Calculate and Format Totals
        
        // Format Total Milk (Kg) from Kg*100 BigInt (Precision 2)
        const totalMilkKgDisplayValue = formatBigIntToNumberString(totalMilkKgBigInt, 2); 
        
        // Format Total Badhotri (Gm) from Gm BigInt (Precision 0)
        const totalBadhotriGmDisplayValue = totalBadhotriGmBigInt.toString();

        // 2. Check Length Requirement
        const milkLengthString = totalMilkKgDisplayValue.replace('-', '').replace('.', '');
        const milkLength = milkLengthString.length;
        const badhotriLengthString = totalBadhotriGmDisplayValue.replace('-', ''); 
        const badhotriLength = badhotriLengthString.length;
        
        const shouldStack = milkLength > MAX_DIGITS_SMALL_BOX || badhotriLength > MAX_DIGITS_SMALL_BOX;

        // 3. Apply/Remove Full-Width Stack Class
        if (shouldStack) {
            resultsSection.classList.add('full-width-stack');
        } else {
            resultsSection.classList.remove('full-width-stack');
        }
        
        // 4. Update Display with formatted text (Kg/Gm unit)
        
        // --- NEW LOGIC FOR TOTAL MILK WARNING ---
        let hasWarning = false; 
        if (milkLength > MAX_DIGITS_MILK_WARNING) { 
             totalMilkKgDisplay.textContent = t.number_too_large;
             totalMilkKgDisplay.classList.add('warning-text-large');
             totalMilkKgDisplay.classList.remove('big-blue-text'); 
             hasWarning = true;
        } else {
             totalMilkKgDisplay.classList.remove('warning-text-large');
             totalMilkKgDisplay.classList.add('big-blue-text');
             
             const totalMilkText = `${totalMilkKgDisplayValue}${NBSP}Kg`;
             totalMilkKgDisplay.innerHTML = totalMilkText;
        }

        // --- LOGIC FOR TOTAL BADHOTRI WARNING ---
        if (badhotriLength > MAX_DIGITS_BADHOTRI_WARNING) { 
             totalBadhotriGmDisplay.textContent = t.number_too_large;
             totalBadhotriGmDisplay.classList.add('warning-text-large');
             totalBadhotriGmDisplay.classList.remove('big-green-text', 'green-text', 'red-text'); 
             hasWarning = true;
        } else {
             totalBadhotriGmDisplay.classList.remove('warning-text-large');
             totalBadhotriGmDisplay.classList.add('big-green-text'); 
             
             const totalBadhotriText = `${totalBadhotriGmDisplayValue}${NBSP}Gm`;
             totalBadhotriGmDisplay.innerHTML = totalBadhotriText;
             
             totalBadhotriGmDisplay.classList.remove('green-text', 'red-text');
             if (totalBadhotriGmBigInt > 0n) {
                 totalBadhotriGmDisplay.classList.add('green-text');
             } else if (totalBadhotriGmBigInt < 0n) {
                 totalBadhotriGmDisplay.classList.add('red-text'); 
             } else {
                  totalBadhotriGmDisplay.classList.add('green-text'); 
             }
        }
        
        // --- COMMON WARNING HANDLER ---
        if (hasWarning) {
             combinedTotalValueDisplay.innerHTML = `---${NBSP}Kg`;
             quantityForRateDisplay.textContent = `(---)`;
             finalPriceDisplay.textContent = '0'; // Updated to 0 after trailing zero removal logic
             totalAmountBox.classList.remove('warning-price-large'); 
             return; 
        }
        
        // 5. Combined and Price Calculations 
        
        // Convert Badhotri Gm to Kg*100 BigInt units for addition: (Gm * 100) / 1000 = Gm / 10n
        // Add half the divisor (5n) for correct rounding
        const DIVISOR_GM_TO_KG_HUNDRED = 10n;
        const HALF_DIVISOR_GM_TO_KG_HUNDRED = 5n;
        
        let badhotriInKgBigInt_temp = totalBadhotriGmBigInt;
        
        let badhotriInKgBigInt;
        if (badhotriInKgBigInt_temp >= 0n) {
             badhotriInKgBigInt = (badhotriInKgBigInt_temp + HALF_DIVISOR_GM_TO_KG_HUNDRED) / DIVISOR_GM_TO_KG_HUNDRED;
        } else {
             badhotriInKgBigInt = (badhotriInKgBigInt_temp - HALF_DIVISOR_GM_TO_KG_HUNDRED) / DIVISOR_GM_TO_KG_HUNDRED;
        }
        
        // Combined Total is in Kg*100 BigInt units (precision 2)
        let combinedTotalBigInt = totalMilkKgBigInt + badhotriInKgBigInt;
        
        const combinedTotalValue = formatBigIntToNumberString(combinedTotalBigInt, 2); 
        combinedTotalValueDisplay.innerHTML = `${combinedTotalValue}${NBSP}Kg`;

        // --- FULL BigInt PRICE CALCULATION (4 DECIMAL PLACES) ---
        
        // 1. Rate को BigInt में parse करें (4 दशमलव सटीकता के साथ: Rate * 10000)
        const rateBigInt = parseInputToBigInt(ratePerKgInput.value, 4) || 0n;
        
        // 2. Price Calculation: 
        // combinedTotalBigInt unit: Kg*100 (precision 2)
        // rateBigInt unit: Rate*10000 (precision 4)
        // Multiplication result: Price * (100 * 10000) = Price * 1000000
        
        let finalPriceBigInt_temp = (combinedTotalBigInt * rateBigInt);

        // हम Price * 10000 के रूप में Price को चाहते हैं (4 दशमलव सटीकता), 
        // इसलिए हमें 100n से भाग देना होगा (1000000n / 10000n = 100n).

        const FINAL_DISPLAY_DIVISOR = 100n; 
        const HALF_FINAL_DIVISOR = FINAL_DISPLAY_DIVISOR / 2n;

        // Price * 10000 BigInt (4 decimal precision) with correct rounding
        let finalPriceBigInt_multiplied_rounded;
        if (finalPriceBigInt_temp >= 0n) {
             // Add half the divisor for rounding away from zero (standard rounding)
             finalPriceBigInt_multiplied_rounded = (finalPriceBigInt_temp + HALF_FINAL_DIVISOR) / FINAL_DISPLAY_DIVISOR;
        } else {
             // Subtract half the divisor for rounding away from zero (standard rounding for negative)
             finalPriceBigInt_multiplied_rounded = (finalPriceBigInt_temp - HALF_FINAL_DIVISOR) / FINAL_DISPLAY_DIVISOR;
        }
        
        // 3. Format final price (अब Price * 10000 के रूप में है)
        // Use precision 4 for the final display value (Trailing zeros removed inside function)
        const finalPriceValue = formatBigIntToNumberString(finalPriceBigInt_multiplied_rounded, 4);
        
        // 🚀 MODIFICATION END
        
        quantityForRateDisplay.textContent = `(${combinedTotalValue})`;
        finalPriceDisplay.textContent = `${finalPriceValue}`;
        
        // NEW: FINAL PRICE WARNING LOGIC 
        // priceLength is checked against the final formatted string value (max 14 integer digits)
        const priceIntegerPart = finalPriceValue.split('.')[0].replace('-', '');
        const priceLength = priceIntegerPart.length;

        if (priceLength > MAX_DIGITS_PRICE_WARNING) { 
             finalPriceDisplay.textContent = t.price_too_large;
             totalAmountBox.classList.add('warning-price-large');
        } else {
             totalAmountBox.classList.remove('warning-price-large');
        }
    }

    function createRow(serial, focus = false) {
        const row = document.createElement('div');
        row.classList.add('input-row');
        row.dataset.serial = serial;
        
        const currentLang = languageSelect.value || 'hi';
        const t = translations[currentLang];
        
        row.innerHTML = `
            <div class="cell">${serial}</div>
            <div class="cell"><input type="text" inputmode="decimal" class="milk-kg-input" value="" placeholder="${t.placeholder_milk}" data-key="placeholder_milk"></div>
            <div class="cell"><input type="text" inputmode="numeric" class="sample-input" value="" placeholder="${t.placeholder_sample}" min="0" data-key="placeholder_sample"></div>
            <div class="cell">
                <div class="badhotri-box static-box" tabindex="-1">
                    <span class="scrolling-text">---</span>
                </div>
            </div>
            <div class="cell action-cell"></div>
        `;

        const inputs = row.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', updateCalculations);
        });
        
        const milkInput = row.querySelector('.milk-kg-input');
        const sampleInput = row.querySelector('.sample-input');
        const badhotriBox = row.querySelector('.badhotri-box'); 

        badhotriBox.addEventListener('click', toggleScrollAndHighlight);
        
        milkInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); 
                sampleInput.focus(); 
            }
        });

        // ✅ MODIFIED: Enter Key to add new line or focus to milk input on new line
        sampleInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); 
                addLine(); 
            }
        });
        
        if (focus) {
             // Use setTimeout to ensure the element is focusable after being rendered
             setTimeout(() => milkInput.focus(), 0);
        }
        
        return row;
    }
    
    /**
     * ✅ MODIFIED FUNCTION: Add Line - Removed empty check.
     * यह फ़ंक्शन पिछली लाइनों में खाली इनपुट की जाँच नहीं करता है।
     */
    function addLine() {
        const rows = tableBody.querySelectorAll('.input-row');
        
        // अगला सीरियल नंबर
        const newSerial = rows.length + 1; 
        const newRow = createRow(newSerial, true); // नई रो बनाएं और फोकस करें
        tableBody.appendChild(newRow);
        
        // नए इनपुट पर स्क्रॉल करें
        tableBody.scrollTop = tableBody.scrollHeight;
    }


    function initializeTable(reset = true) {
        if (reset) {
            tableBody.innerHTML = '';
        }
        
        const existingRows = tableBody.querySelectorAll('.input-row');
        const currentCount = existingRows.length;

        // ✅ FIX: सुनिश्चित करें कि कम से कम एक रो हमेशा हो
        if (currentCount === 0) {
            const newRow = createRow(1);
            tableBody.appendChild(newRow);
        } else {
            // यदि रो पहले से हैं, तो सीरियल नंबर अपडेट करें
            updateSerialNumbers();
        }

        updateCalculations();
    }
    
    // --- EVENT LISTENERS AND SETUP ---
    
    // Function to handle line deletion
    function deleteLinesByRange() {
        const start = parseInputToNumber(deleteStartInput.value);
        const end = parseInputToNumber(deleteEndInput.value) || start; // If end is empty, delete only the start line
        
        const rows = tableBody.querySelectorAll('.input-row');
        
        if (rows.length === 1 && (start === 1 || start === 0)) {
             // Allow clearing the value of the only row if requested to delete line 1
             rows[0].querySelector('.milk-kg-input').value = '';
             rows[0].querySelector('.sample-input').value = '';
             updateCalculations();
             deleteStartInput.value = '';
             deleteEndInput.value = '';
             return;
        }
        
        if (start < 1 || start > rows.length) {
             const currentLang = languageSelect.value || 'hi';
             showAlert(`हटाएँ करने के लिए, कृपया 1 और ${rows.length} के बीच एक वैध सीरियल नंबर दर्ज करें।`);
             return;
        }
        
        if (end < start || end > rows.length) {
             const currentLang = languageSelect.value || 'hi';
             showAlert(`हटाएँ करने के लिए, अंतिम सीरियल (${end}) शुरू सीरियल (${start}) से कम नहीं होना चाहिए और ${rows.length} से अधिक नहीं होना चाहिए।`);
             return;
        }
        
        // Prevent deleting all rows to maintain a minimum of one empty row
        if (rows.length - (end - start + 1) < 1) {
             showAlert('कम से कम एक खाली लाइन छोड़ने के लिए आप सभी लाइनों को नहीं हटा सकते हैं।');
             return;
        }

        const rowsToDelete = [];
        for (let i = start - 1; i < end; i++) {
            rowsToDelete.push(rows[i]);
        }
        
        rowsToDelete.forEach(row => row.remove());

        // Reset the input fields
        deleteStartInput.value = '';
        deleteEndInput.value = '';

        // Re-index and recalculate
        updateSerialNumbers();
        updateCalculations();
        
        // ✅ MODIFIED: Ensure at least one row remains
        initializeTable(false);
    }
    
    // 🔔 NEW: Add Line Button Listener
    if (addLineBtn) {
         addLineBtn.addEventListener('click', addLine);
    }
    
    // 🔔 NEW: Social Button Listeners 
    if (whatsappGroupBtn) {
        whatsappGroupBtn.addEventListener('click', () => {
            window.open(WHATSAPP_GROUP_LINK, '_blank');
        });
    }

    if (telegramGroupBtn) {
        telegramGroupBtn.addEventListener('click', () => {
            window.open(TELEGRAM_GROUP_LINK, '_blank');
        });
    }

    if (telegramChannelBtn) {
        telegramChannelBtn.addEventListener('click', () => {
            window.open(TELEGRAM_CHANNEL_LINK, '_blank');
        });
    }
    
    // Clear Button Listener to open modal
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', () => {
             clearAllModal.style.display = 'block';
        });
    }
    
    // Clear All Modal Logic
    clearCloseBtn.addEventListener('click', () => clearAllModal.style.display = 'none');
    clearCancelBtn.addEventListener('click', () => clearAllModal.style.display = 'none');
    
    clearConfirmBtn.addEventListener('click', () => {
         clearAllInputs(); 
         clearAllModal.style.display = 'none';
    });
    
    // Custom Alert Modal Logic 
    alertCloseBtn.addEventListener('click', () => errorAlertModal.style.display = 'none');
    alertOkBtn.addEventListener('click', () => errorAlertModal.style.display = 'none');
    
    // Delete Lines Button Listener (Main Page)
    if (deleteLinesBtn && deleteStartInput && deleteEndInput) {
        deleteLinesBtn.addEventListener('click', deleteLinesByRange);
        
        deleteEndInput.addEventListener('keydown', (e) => {
             if (e.key === 'Enter') {
                 e.preventDefault();
                 deleteLinesByRange();
             }
        });
        deleteStartInput.addEventListener('keydown', (e) => {
             if (e.key === 'Enter') {
                 e.preventDefault();
                 if (deleteEndInput.value === '') {
                     deleteEndInput.focus();
                 } else {
                     deleteLinesByRange();
                 }
             }
        });
    }

    // Modal Open/Close
    openSettingsBtn.addEventListener('click', () => settingsModal.style.display = 'block');
    settingsCloseBtn.addEventListener('click', () => settingsModal.style.display = 'none');
    
    // Help Center Modal (Now Contact Us)
    helpCenterBtn.addEventListener('click', () => {
        settingsModal.style.display = 'none'; 
        helpCenterModal.style.display = 'block'; 
    });
    helpCenterCloseBtn.addEventListener('click', () => helpCenterModal.style.display = 'none');
    
    // Close Modals on outside click 
    window.addEventListener('click', (event) => {
        if (event.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
        if (event.target === helpCenterModal) {
            helpCenterModal.style.display = 'none';
        }
        if (event.target === clearAllModal) {
            clearAllModal.style.display = 'none';
        }
        if (event.target === errorAlertModal) {
            errorAlertModal.style.display = 'none';
        }
    });
    
    // Language Change Listener
    
    // Placeholder function for language application 
    function applyLanguage(lang) {
        const t = translations[lang];
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.dataset.key;
            if (t[key]) {
                 if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                     element.placeholder = t[key];
                 } else if (element.id === 'add-line-btn') {
                     // Add Line Button is a special case for innerHTML (to keep the icon class)
                     element.innerHTML = `<span class="icon">+</span>`; // Keep '+' as an icon
                     element.setAttribute('title', t.add_line_btn);
                 } else if (element.classList.contains('feedback-title')) {
                      // Feedback Title is handled by data-key
                      element.textContent = t[key];
                 } else if (element.classList.contains('feedback-body')) {
                      // Feedback Body uses innerHTML due to <br> and <strong> tags
                      element.innerHTML = t[key];
                 } else {
                     element.textContent = t[key];
                 }
            }
        });
        // Special case for select options
        document.querySelectorAll('#language-select option').forEach(option => {
             const key = option.dataset.key;
             if (t[key]) {
                 option.textContent = t[key];
             }
        });
        // 🎯 FIX APPLIED HERE: The document title will now be 'Milk Scale App' even in Hindi
        document.title = t.app_title; 
        
        // Re-initialize table to update placeholders/titles if language changes
        initializeTable(false); 
        updateCalculations();
    }
    // End Placeholder function
    
    languageSelect.addEventListener('change', () => {
        const newLang = languageSelect.value;
        localStorage.setItem('appLanguage', newLang);
        applyLanguage(newLang); 
    });

    // --- Help Center Form Logic ---
    const MAX_CHARS = 1000;

    function updateCharCount() {
        const currentLength = problemDescription.value.length;
        
        if (currentLength > MAX_CHARS) {
            problemDescription.value = problemDescription.value.substring(0, MAX_CHARS);
        }
        
        charCountDisplay.textContent = problemDescription.value.length;
    }
    
    problemDescription.addEventListener('input', updateCharCount);

    // Form Submission (Mailto Functionality)
    helpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const currentLang = languageSelect.value;
        const t = translations[currentLang];
        
        // ✅ यहाँ रिसीवर ईमेल जोड़ें!
        const recipientEmail = 'milkscaleapp@gmail.com'; 
        
        const name = userNameInput.value.trim();
        const email = userEmailInput.value.trim();
        const phone = userPhoneInput.value.trim();
        const problem = problemDescription.value.trim();
        
        if (problem.length < 1) {
            showAlert(t.form_error_no_problem); 
            return;
        }

        const emailBody = `
==============================
User Details:
==============================
Name: ${name}
Email: ${email}
Phone: ${phone}
Language: ${currentLang}
Date/Time: ${new Date().toLocaleString()}
==============================
Problem Description:
==============================
${problem}
==============================
`;
        
        const subject = encodeURIComponent(t.email_subject);
        const body = encodeURIComponent(emailBody);
        
        const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
        
        window.location.href = mailtoLink;
        
        setTimeout(() => {
            helpCenterModal.style.display = 'none';
            helpForm.reset();
            updateCharCount(); 
            
            if (deleteStartInput) deleteStartInput.value = '';
            if (deleteEndInput) deleteEndInput.value = '';

        }, 500);
    });

    // Calculation Triggers
    ratePerKgInput.addEventListener('input', updateCalculations);
    
    // --- Initial Load Sequence ---
    
    const storedLang = localStorage.getItem('appLanguage') || 'hi';
    languageSelect.value = storedLang;

    // Apply language and initialize everything on load
    applyLanguage(storedLang); 
    updateCharCount(); 
    
    // ✅ FIX: Initial table load is called to ensure at least one row exists
    initializeTable(false); 
});
