import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
import posts from "../../../data/posts.json";

export default class BlogList extends Component {
  state = {
    blog: [],
  };
  componentDidMount = () => {
    this.fetchDatas();
  };
  fetchDatas = async () => {
    const url = "http://localhost:3003/blogPosts/";
    try {
      let response = await fetch(url);
      let data = await response.json();
      if (response.ok) {
        console.log(data);
        this.setState({ blog: data });
      } else {
        console.log("Some error");
      }
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <Row>
        {this.state.blog && this.state.blog.map((post) => (
          <Col md={4} style={{ marginBottom: 50 }}>
            <BlogItem key={post.title} {...post} />
          </Col>
        ))}
      </Row>
    );
  }
}
