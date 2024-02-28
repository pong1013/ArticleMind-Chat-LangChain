## ArticleMind ChatBot

### Introduction:

In this project, we utilize the API provided by LangChain to leverage large language models offered by companies like OpenAI and Google. With this setup, our chatbot can read documents provided by the user and answer professional questions from within them. One noteworthy aspect is that our bot can retain memory of previous questions, allowing users to seek answers more conveniently.

The chatbot is presented as a web application, consisting of a frontend directory and a backend program directory.


### Step 1: Azure OpenAI ChatGPT Configuration:

1. First, navigate to the "chatbot-server" directory and install Python packages listed in "requirements.txt". **Python version 3.8 or higher is required**.
    
    ```
    pip install -r requirements.txt
    
    ```
    
2. Run `api.py` to connect to the Azure-hosted ChatGPT model.
    
    ```
    python3 api.py
    
    ```
    
3. **(Only required when updating the documents)** Run `glob-doc.py` to collect all the documents from the "./docs" folder and store them in a file named `all-doc.md`.
    
    ```
    python3 glob-doc.py
    
    ```
    
4. Convert the `all-doc.md` file into a dynamic database to enable ChatGPT to access its content as knowledge.
    
    ```
    python3 embedding.py
    
    ```
    

### Step 2: Activate Backend Server

After completing the configuration, start the backend service, including the conversation chain:

```
python3 app.py

```

The two main functions are:

1. **answer_question()**
    
    Upon receiving a question from the frontend, it generates a response and saves the conversation history to retain chat memory.
    
2. **clean_chat_history()**
    
    Clears the conversation history.
    

### Step 3: Activate Frontend GUI

Once the backend is running, enable the frontend GUI. Navigate to the "chatbot-gui" directory:

```bash
yarn start
```
