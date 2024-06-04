from langchain.vectorstores import Chroma
from langchain.chains import ConversationalRetrievalChain
from api import model, embeddings
from flask_cors import CORS
from flask import Flask, request

# from waitress import serve
import json

chat_history = []

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "allow_headers": ["content-type"]}})
docsearch = Chroma(persist_directory="./vector_store", embedding_function=embeddings)


@app.route("/")
def index():
    return "hello"


# chatbot
# qa = VectorDBQA.from_chain_type(
#     llm=model, chain_type="stuff", vectorstore=docsearch, return_source_documents=True
# )
qa = ConversationalRetrievalChain.from_llm(model, retriever=docsearch.as_retriever())


@app.route("/clean-chat-history", methods=["GET"])
def clean_chat_history():
    chat_history.clear()
    return "Chat history cleaned"


@app.route("/qa", methods=["POST"])
def answer_question():

    question = request.json["question"]

    # Perform the question-answering
    result = qa({"question": question, "chat_history": chat_history})
    answer = result["answer"]
    # print({'question': question, 'answer': answer})

    # Update the chat history
    chat_history.append((question, result["answer"]))

    # Return the result as JSON
    return json.dumps({"question": question, "answer": answer})


# class GunicornServer(BaseApplication):
#     def __init__(self, app, options=None):
#         self.options = options or {}
#         self.application = app
#         super().__init__()

#     def load_config(self):
#         for key, value in self.options.items():
#             self.cfg.set(key, value)

#     def load(self):
#         return self.application

# Running app
if __name__ == "__main__":
    # serve(app, host="0.0.0.0", port=5001)
    app.run(debug=True, host="0.0.0.0", port=3035)
    # options = {
    #     'bind': '0.0.0.0:5002',  # Set the host and port
    #     'workers': 4,  # Number of worker processes
    #     'threads': 2,  # Number of threads per worker
    # }
    # server = GunicornServer(app, options)
    # server.run()
