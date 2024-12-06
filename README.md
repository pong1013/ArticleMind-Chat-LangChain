## ArticleMind ChatBot

### Introduction:

In this project, we utilize the API provided by LangChain to leverage large language models offered by companies like OpenAI and Google. With this setup, our chatbot can read documents provided by the user and answer professional questions from within them. One noteworthy aspect is that our bot can retain memory of previous questions, allowing users to seek answers more conveniently.

The chatbot is presented as a web application, consisting of a frontend directory and a backend program directory.

![plot](flowchart.png)
### Step 1: Azure OpenAI ChatGPT Configuration:

First, navigate to the "chatbot-server" directory and install Python packages listed in `requirements.txt`. **Python version 3.8 or higher is required**.
    
```
pip install -r requirements.txt
```
    

### Step 2: Activate Backend Server

After completing the configuration, start the backend service, including the conversation chain:

```
python3 main.py
```


### Step 3: Activate Frontend GUI

Once the backend is running, enable the frontend GUI. Navigate to the "chatbot-gui" directory:

```bash
pnpm install
pnpm start
```
