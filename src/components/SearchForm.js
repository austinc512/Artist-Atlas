import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AlbumCard from './AlbumCard';
import cookie from 'cookie';

const grant_type = process.env.REACT_APP_grant_type;
const client_id = process.env.REACT_APP_client_id;
const client_secret = process.env.REACT_APP_client_secret;

const data = new URLSearchParams();
data.append('grant_type', grant_type);
data.append('client_id', client_id);
data.append('client_secret', client_secret);

function SearchForm() {
  const [artistSearch, setArtistSearch] = useState('');
  //   const [token, setToken] = useState('');
  const [albums, setAlbums] = useState([]);

  // create paging
  const [offset, setOffset] = useState(0);

  let cookies = cookie.parse(document.cookie);
  let authToken = cookies.authToken;

  const handleSubmit = async () => {
    // e.preventDefault();
    console.log(artistSearch);
    console.log(
      `https://api.spotify.com/v1/search?q=${artistSearch}&type=album&limit=10&offset=${offset}`
    );

    axios
      .get(
        `https://api.spotify.com/v1/search?q=${artistSearch}&type=album&limit=10&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.albums.items);
        setAlbums(res.data.albums.items);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (artistSearch) {
      handleSubmit();
    }
  }, [offset]);

  const getToken = () => {
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: data,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((response) => {
        // console.log(response.data.access_token); // turn off in prod
        // setToken(response.data.access_token); // bad too
        document.cookie = cookie.serialize(
          'authToken',
          response.data.access_token,
          {
            path: '/',
            maxAge: 3540, // 59 minutes
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log(albums);
  }, [albums]);

  return (
    <div>
      <button onClick={getToken} disabled={authToken}>
        Get access token
      </button>
      <div className="artist-form">
        <input
          required
          onChange={(e) => {
            setArtistSearch(e.target.value);
          }}
          value={artistSearch}
          type="text"
        />
        <button disabled={!authToken} onClick={handleSubmit}>
          Search
        </button>
      </div>
      <div className="album-list">
        {albums.length ? (
          albums.map((album, idx) => {
            return <AlbumCard album={album} key={`${album.name}${idx}`} />;
          })
        ) : (
          <p>(Nothing to show)</p>
        )}
        {albums.length && offset >= 10 ? (
          <div className="artist-form">
            <button
              onClick={() => {
                setOffset(offset - 10);
                handleSubmit();
              }}
            >
              Previous Page
            </button>
          </div>
        ) : null}
        {albums.length ? (
          <div className="artist-form">
            <button
              onClick={() => {
                setOffset(offset + 10);
                handleSubmit();
              }}
            >
              Next Page
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SearchForm;

/*
  const fetchProducts = () => {
    if (token.length) {
      axios
        .get(`${host}/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProducts(res.data.data);
          console.log(res.data.data);
        });
    }
  };
  https://api.spotify.com/v1/search?q=Bill%20Evans&type=album&limit=10&offset=10

  `https://api.spotify.com/v1/search?q=${variable}&type=album&limit=10&offset=10`
*/
