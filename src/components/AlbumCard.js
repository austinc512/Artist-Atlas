import React from 'react';

function formatTitle(title, maxLength = 25) {
  if (title.length <= maxLength) {
    return title;
  }

  // Split title into words
  const words = title.split(' ');
  let formattedTitle = '';
  let currentLineLength = 0;

  words.forEach((word) => {
    if (currentLineLength + word.length > maxLength) {
      // Insert line break
      // reset the current line length
      formattedTitle += '\n';
      currentLineLength = 0;
    }
    formattedTitle += word + ' ';
    currentLineLength += word.length + 1;
  });

  return formattedTitle.trim();
}

function AlbumCard({ album }) {
  return (
    <div className="album-card">
      <p className="album-title">
        <a href={album.external_urls.spotify} target="_blank">
          {formatTitle(album.name)}
        </a>
        {/* <a href={album.external_urls.spotify}>{album.name}</a> */}
      </p>
      <img
        src={album.images[1].url || album.images[0].url}
        alt={album.name}
        className="album-image"
      />
    </div>
  );
}

export default AlbumCard;
