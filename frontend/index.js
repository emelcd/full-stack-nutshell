import { html, render } from "https://unpkg.com/lit-html?module";

const onSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  //   check if the title and the author is more than 5 chars and less than 50 chars
  if (data.get("title").length < 5 || data.get("title").length > 50) {
    alert("Title must be between 5 and 50 characters");
    return;
  }
  if (data.get("author").length < 5 || data.get("author").length > 50) {
    alert("Author must be between 5 and 50 characters");
    return;
  }
  // check if the content is more than 5 chars and less than 50 chars
  if (data.get("content").length < 10 || data.get("content").length > 500) {
    alert("Content must be between 5 and 50 characters");
    return;
  }

  fetch("http://localhost:5000/new", {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      fetchBlogs();
    });
};

const style = () => {
  return html`
    <style>
      .form {
        margin: auto;
        width: 50%;
      }
      .form_input {
        width: 100%;
        height: 40px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 10px;
        padding: 0 10px;
        text-align: center;
        resize: none;
      }
      .textarea {
        width: 100%;
        height: 100px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 10px;
        padding: 0 10px;
        text-align: center;
        resize: none;
        padding: 10px;
      }

      .container-blog {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-gap: 20px;
        padding: 20px;
      }
      .blog {
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 10px;
        transition: all 0.3s ease-in-out;
      }
      .blog:hover {
        transform: scale(1.05);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      }
      .blog_title {
        font-size: 1.2em;
      }
      .blog_content {
        font-size: 0.8em;
        padding: 10px;
        font-family: sans-serif;
      }
      .blog_author {
        float: right;
      }
    </style>
  `;
};

const formTemplate = (data) => {
  return html`
    <form class="form" @submit=${onSubmit}>
      <!-- make an input for a blog -->
      <input class="form_input" type="text" name="title" placeholder="Title" />
      <textarea
        cols="30"
        rows="5"
        class="form_input textarea"
        name="content"
        placeholder="Content"
        value=${data.content}
      ></textarea>
      <input
        class="form_input"
        type="text"
        name="author"
        placeholder="Author"
      />
      <input class="form_input" type="submit" value="Submit" />
    </form>
  `;
};

const fetchBlogs = () => {
  fetch("http://localhost:5000/blog")
    .then((response) => response.json())
    .then((data) => {
        render(
            html`
          ${data.reverse().map((blog) => {
              console.log(blog.date)
              let date ;
            return html`
              <div class="blog">
                <h3 class="blog_title">${blog.title}</h3>
                <p class="blog_content">${blog.content}</p>
                <span class="blog_author">${blog.author}</span>
                <span class="blog_date">${date}</span>
              </div>
            `;
          })}
        `,
        document.getElementById("blog")
      );
    });
};

fetchBlogs();

const app = () => {
  return html`
    ${style()} ${formTemplate({ name: "", email: "" })}
    <hr />
    <div class="container-blog" id="blog"></div>
  `;
};

render(app(), document.getElementById("app"));
