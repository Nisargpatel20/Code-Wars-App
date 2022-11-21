import React from 'react'

export default function Comment({username, caption}) {
  return (
    <div class="comment">
      <p><strong style={{marginRight:'4px'}}>
          {username}
          </strong>
        {caption}</p>
    </div>
  )
}
