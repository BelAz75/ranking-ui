import React, { Component } from 'react';
import { PanelSpinner } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import CosmoPost from '../post/post';
import { COSMO_API_ENDPOINT, COSMO_FEED_ENDPOINT } from '../../constants/endpoint.constant';

class CosmoFeed extends Component {
  constructor (props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      posts: [],
    }
  }

  componentDidMount () {
    fetch(`${COSMO_API_ENDPOINT}/${COSMO_FEED_ENDPOINT}`)
      .then(res => res.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            posts: data,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        },
      )
      .catch(console.log)
  }

  render () {
    const { error, isLoaded, posts } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div>
          {
            !isLoaded
              ? <PanelSpinner/>
              : <LazyLoadComponent>
                  {
                    posts.map(post => (
                      <CosmoPost key={post.timestamp} post={post}/>
                    ))
                  }
                </LazyLoadComponent>
          }
        </div>
      )
    }
  }
}

export default CosmoFeed;
