import subprocess
import streamlit as st

# Define a function that runs the Node.js application and returns the output
def run_node_app():
    result = subprocess.run(['node', 'app.js'], capture_output=True)
    return result.stdout.decode()

# Create a Streamlit app that displays the output of the Node.js application
def main():
    st.title('Node.js App')
    output = run_node_app()
    st.code(output)

if __name__ == '__main__':
    main()
