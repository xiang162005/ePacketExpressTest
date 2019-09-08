# The python test in the PythonTest

# The Node.js test in the NodejsTest

**The Node.js test has deploy in alicloud: http://47.97.230.218:8080/v1/log**

You must send the POST request with json like:  {"ablum_list": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}

If correct, it will response OK

*****************************************************************************

create and enter a  python virtual environment

    cd PythonTest

    python -m venv venv

    source  venv/bin/activate

install python requirements

    pip install -r requirements.txt

begin python test part a and part b

    python test_ab.py

begin python test part c

    python test_c.py

******************************************************************************

install node.js requirements

    cd ..

    cd NodejsTest

    npm update
