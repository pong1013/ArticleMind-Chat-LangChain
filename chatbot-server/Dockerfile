FROM python:3.9-slim

WORKDIR /app

COPY . .


RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 3035

CMD ["python3", "main.py"]
