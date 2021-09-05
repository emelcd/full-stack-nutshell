from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_cors import CORS
from mongoengine import  *
from datetime import datetime

connect('blog_db')

class Blog(Document):
    title = StringField(required=True, max_length=100, min_length=5)
    content = StringField(required=True, max_length=500, min_length=10)
    author = StringField(required=True, max_length=100, min_length=5)
    date = DateTimeField(required=True)


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
CORS(app)

# date to str



@app.route('/new', methods=['POST'])
def index():
    if request.method == 'POST':
        blog = Blog(title=request.form['title'], content=request.form['content'], author=request.form['author'], date=datetime.now())
        blog.save()
        return jsonify({"status": "success"})
    return jsonify({"status": "fail"})


@app.route('/blog')
def getBlogs():
    # find all blogs
    blogs = Blog.objects.to_json()
    return blogs

if __name__ == '__main__':
    app.run(debug=True)

