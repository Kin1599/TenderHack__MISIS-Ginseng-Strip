FROM pytorch/pytorch
#FROM python:3.11.7-alpine
 
RUN python3 -m pip install --upgrade pip
COPY ../requirements.txt ./requirements.txt
#RUN --mount=type=cache,target=/root/.cache/pip pip install pyyaml
#RUN pip install pip3 install torch torchvision torchaudio -f https://download.pytorch.org/whl/torch_stable.html

RUN pip install --no-cache-dir --upgrade -r ./requirements.txt

COPY ./local_requirements.txt ./local_requirements.txt
RUN pip install --no-cache-dir --upgrade -r ./local_requirements.txt
COPY . .
#COPY $FOLDER /app

# 
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]