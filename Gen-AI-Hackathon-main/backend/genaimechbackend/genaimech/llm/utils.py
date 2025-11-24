# ---------------------------------------------
# TEMPORARILY DISABLE LLM TO AVOID HF DOWNLOAD
# ---------------------------------------------

def load_config(CONFIG_PATH):
    return {}

def generate_prompt_medical(question, context, answer=None):
    if answer:
        return f"question: {question} context: {context} answer: {answer}"
    else:
        return f"question: {question} context: {context}"

# Dummy LLM class so the system does not break
class FakeLLM:
    def __init__(self):
        pass

# Use dummy LLM instead of HuggingFace
class Settings:
    llm = FakeLLM()
    embed_model = None
    chunk_size = 512
