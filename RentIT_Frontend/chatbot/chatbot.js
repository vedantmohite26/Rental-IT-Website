
/* =====================================================
   RENTAI CHATBOT
   Connected to RentIT Backend
   ===================================================== */

(function () {

    // Prevent duplicate chatbot
    if (document.getElementById("rentai-button")) {
        return;
    }

    const API_URL = "http://localhost:3000/api/chat";
    const IMAGE_BASE_URL = "http://localhost:3000/uploads/";


    /* -------------------------------------------------
       CHAT BUTTON
       ------------------------------------------------- */

    const button = document.createElement("button");

    button.id = "rentai-button";
    button.innerHTML = "🤖";
    button.title = "Chat with RentAI";


    /* -------------------------------------------------
       CHAT WINDOW
       ------------------------------------------------- */

    const chatWindow = document.createElement("div");

    chatWindow.id = "rentai-window";

    chatWindow.innerHTML = `

        <div class="rentai-header">

            <div class="rentai-header-left">

                <div class="rentai-avatar">
                    🤖
                </div>

                <div>

                    <div class="rentai-title">
                        RentAI
                    </div>

                    <div class="rentai-status">
                        AI Assistant • Online
                    </div>

                </div>

            </div>

            <button id="rentai-close">
                ×
            </button>

        </div>

        <div id="rentai-messages">

            <div class="rentai-message bot">

                <div class="rentai-bubble">

                    Hello! 👋<br><br>

                    I'm <strong>RentAI</strong>,
                    your RentIT AI assistant.

                    <br><br>

                    I can help you find rental products
                    and answer questions about RentIT.

                </div>

            </div>

        </div>

        <div class="rentai-input-area">

            <input
                type="text"
                id="rentai-input"
                placeholder="Ask RentAI..."
                autocomplete="off"
            >

            <button id="rentai-send">
                ➤
            </button>

        </div>

    `;


    /* -------------------------------------------------
       ADD CHATBOT TO PAGE
       ------------------------------------------------- */

    document.body.appendChild(button);
    document.body.appendChild(chatWindow);


    /* -------------------------------------------------
       ELEMENTS
       ------------------------------------------------- */

    const closeButton =
        document.getElementById("rentai-close");

    const input =
        document.getElementById("rentai-input");

    const sendButton =
        document.getElementById("rentai-send");

    const messages =
        document.getElementById("rentai-messages");


    /* -------------------------------------------------
       OPEN CHAT
       ------------------------------------------------- */

    button.addEventListener("click", function () {

        const isOpen =
            chatWindow.style.display === "flex";

        if (isOpen) {

            chatWindow.style.display = "none";

        } else {

            chatWindow.style.display = "flex";

            setTimeout(function () {
                input.focus();
            }, 100);

        }

    });


    /* -------------------------------------------------
       CLOSE CHAT
       ------------------------------------------------- */

    closeButton.addEventListener("click", function () {

        chatWindow.style.display = "none";

    });


    /* -------------------------------------------------
       ADD MESSAGE
       ------------------------------------------------- */

    function addMessage(text, sender) {

        const message =
            document.createElement("div");

        message.className =
            "rentai-message " + sender;

        const bubble =
            document.createElement("div");

        bubble.className =
            "rentai-bubble";

        // Safely display text and preserve new lines
        bubble.textContent = text || "";

        bubble.style.whiteSpace = "pre-wrap";

        message.appendChild(bubble);

        messages.appendChild(message);

        // Scroll to latest message
        messages.scrollTop =
            messages.scrollHeight;

    }


    /* -------------------------------------------------
       GET PRODUCT IMAGE URL
       ------------------------------------------------- */

    function getProductImageUrl(imageValue) {

        if (
            !imageValue ||
            typeof imageValue !== "string"
        ) {
            return "";
        }

        // Supports filenames and stored paths
        const filename =
            imageValue.split(/[\\/]/).pop();

        if (!filename) {
            return "";
        }

        return IMAGE_BASE_URL +
            encodeURIComponent(filename);

    }


    /* -------------------------------------------------
       ADD PRODUCT CARDS WITH IMAGES
       ------------------------------------------------- */

    function addProductCards(products) {

        if (
            !Array.isArray(products) ||
            products.length === 0
        ) {
            return;
        }

        products.forEach(function (product) {

            const productCard =
                document.createElement("div");

            productCard.className =
                "chat-product-card";


            /* -----------------------------------------
               PRODUCT IMAGE
            ----------------------------------------- */

            const imageUrl =
                getProductImageUrl(product.image);

            if (imageUrl) {

                const image =
                    document.createElement("img");

                image.className =
                    "chat-product-image";

                image.alt =
                    product.name || "Rental product";

                image.loading = "lazy";

                image.src = imageUrl;

                image.onerror = function () {
                    image.style.display = "none";
                };

                productCard.appendChild(image);

            }


            /* -----------------------------------------
               PRODUCT NAME
            ----------------------------------------- */

            const name =
                document.createElement("div");

            name.className =
                "chat-product-name";

            name.textContent =
                product.name || "Unnamed Product";


            /* -----------------------------------------
               PRODUCT CATEGORY
            ----------------------------------------- */

            const category =
                document.createElement("div");

            category.className =
                "chat-product-category";

            category.textContent =
                product.category || "Other";


            /* -----------------------------------------
               PRODUCT PRICE
            ----------------------------------------- */

            const price =
                document.createElement("div");

            price.className =
                "chat-product-price";

            price.textContent =
                `₹${product.price ?? 0}`;


            /* -----------------------------------------
               VIEW PRODUCT BUTTON
            ----------------------------------------- */

            const viewButton =
                document.createElement("button");

            viewButton.className =
                "chat-view-product";

            viewButton.textContent =
                "View Product";

            viewButton.dataset.productId =
                product.product_id ?? "";


            viewButton.addEventListener(
                "click",
                function () {

                    const productId =
                        product.product_id;

                    if (productId == null) {
                        console.error(
                            "Product ID is missing."
                        );
                        return;
                    }

                    console.log(
                        "Opening product:",
                        productId
                    );

                    /*
                     * product_details.html is assumed
                     * to be in the same folder as the
                     * page loading this chatbot.
                     */

                    window.location.href =
                        `product_details.html?id=${
                            encodeURIComponent(productId)
                        }`;

                }
            );


            /* -----------------------------------------
               ADD ELEMENTS TO CARD
            ----------------------------------------- */

            productCard.append(
                name,
                category,
                price,
                viewButton
            );

            messages.appendChild(productCard);

        });

        messages.scrollTop =
            messages.scrollHeight;

    }


    /* -------------------------------------------------
       TYPING INDICATOR
       ------------------------------------------------- */

    function showTyping() {

        const typing =
            document.createElement("div");

        typing.className =
            "rentai-message bot";

        typing.id =
            "rentai-typing";

        typing.innerHTML = `

            <div class="rentai-bubble">

                <div class="rentai-typing">

                    <span></span>
                    <span></span>
                    <span></span>

                </div>

            </div>

        `;

        messages.appendChild(typing);

        messages.scrollTop =
            messages.scrollHeight;

    }


    /* -------------------------------------------------
       REMOVE TYPING INDICATOR
       ------------------------------------------------- */

    function removeTyping() {

        const typing =
            document.getElementById("rentai-typing");

        if (typing) {
            typing.remove();
        }

    }


    /* -------------------------------------------------
       SEND MESSAGE TO BACKEND
       ------------------------------------------------- */

    async function sendMessage() {

        const message =
            input.value.trim();

        // Don't send empty messages
        if (!message) {
            return;
        }

        // Display user message
        addMessage(message, "user");

        // Clear input
        input.value = "";

        // Disable send button
        sendButton.disabled = true;

        // Show typing indicator
        showTyping();

        try {

            const response =
                await fetch(API_URL, {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        message: message
                    })

                });

            const data =
                await response.json();

            // Remove typing indicator
            removeTyping();


            /* -----------------------------------------
               CHECK API RESPONSE
            ----------------------------------------- */

            if (
                !response.ok ||
                !data.success
            ) {

                addMessage(
                    "Sorry, I'm having trouble connecting to RentAI right now. Please try again.",
                    "bot"
                );

                console.error(
                    "RentAI API error:",
                    data
                );

                return;

            }


            /* -----------------------------------------
               DISPLAY AI RESPONSE
            ----------------------------------------- */

            addMessage(
                data.reply || "How else can I help you?",
                "bot"
            );


            /* -----------------------------------------
               DISPLAY PRODUCT CARDS
            ----------------------------------------- */

            if (
                Array.isArray(data.products) &&
                data.products.length > 0
            ) {

                addProductCards(data.products);

            }

        } catch (error) {

            console.error(
                "RentAI connection error:",
                error
            );

            removeTyping();

            addMessage(
                "Sorry, I couldn't connect to the RentIT AI server. Please make sure the RentIT backend is running.",
                "bot"
            );

        } finally {

            // Enable send button
            sendButton.disabled = false;

            input.focus();

        }

    }


    /* -------------------------------------------------
       SEND BUTTON
       ------------------------------------------------- */

    sendButton.addEventListener(
        "click",
        sendMessage
    );


    /* -------------------------------------------------
       ENTER KEY
       ------------------------------------------------- */

    input.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                sendMessage();

            }

        }
    );

})();
