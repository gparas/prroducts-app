import React, { Component } from 'react';
import Modal from 'react-modal';
import findIndex from 'lodash/findIndex';
import mousetrap from 'mousetrap';
import { navigate, StaticQuery, graphql } from 'gatsby';

let posts;

Modal.setAppElement(`body`);

class ProductModal extends Component {
  componentDidMount() {
    mousetrap.bind(`left`, () => this.previous());
    mousetrap.bind(`right`, () => this.next());
    mousetrap.bind(`space`, () => this.next());
  }

  componentWillUnmount() {
    mousetrap.unbind(`left`);
    mousetrap.unbind(`right`);
    mousetrap.unbind(`space`);
  }

  findCurrentIndex() {
    console.log(this.props.location);
    let index;
    index = findIndex(
      posts,
      post => post.id === this.props.location.pathname.split(`/`)[1]
    );

    return index;
  }

  next(e) {
    if (e) {
      e.stopPropagation();
    }
    const currentIndex = this.findCurrentIndex();
    if (currentIndex || currentIndex === 0) {
      let nextPost;
      // Wrap around if at end.
      if (currentIndex + 1 === posts.length) {
        nextPost = posts[0];
      } else {
        nextPost = posts[currentIndex + 1];
      }
      navigate(`/${nextPost.id}/`);
    }
  }

  previous(e) {
    if (e) {
      e.stopPropagation();
    }
    const currentIndex = this.findCurrentIndex();
    if (currentIndex || currentIndex === 0) {
      let previousPost;
      // Wrap around if at start.
      if (currentIndex === 0) {
        previousPost = posts.slice(-1)[0];
      } else {
        previousPost = posts[currentIndex - 1];
      }
      navigate(`/${previousPost.id}/`);
    }
  }

  handleCloseModal = () => {
    navigate(this.props.modalBackgroundPath);
  };

  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            allDemoProducts {
              edges {
                node {
                  id
                }
              }
            }
          }
        `}
        render={data => {
          if (!posts) {
            posts = data.allDemoProducts.edges.map(e => e.node);
          }
          return (
            <Modal
              isOpen
              onRequestClose={this.handleCloseModal}
              contentLabel="Modal"
            >
              {this.props.children}
            </Modal>
          );
        }}
      />
    );
  }
}

export default ProductModal;
