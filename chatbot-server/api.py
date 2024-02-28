from langchain.chat_models import ChatOpenAI
from langchain.embeddings.openai import OpenAIEmbeddings


model = ChatOpenAI(
    temperature=0,
    openai_api_key="",
    model_name="",
)

# 初始化 openai 的 embeddings 对象
embeddings = OpenAIEmbeddings(
    openai_api_key="",
    model="",
    request_timeout=60,
)
