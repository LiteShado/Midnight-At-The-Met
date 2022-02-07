import React from "react";

function Page(props) {

const paintings = props.art;

return (

  <div className="page">
            <img
                className="image"
                src={paintings.primaryImage}
                alt={paintings.title}
            />

          <div className="result">
            <div>
              Title: <p className="info">{paintings.title}</p>
            </div>
            <div>
              Artist Name: <p className="info">{paintings.artistDisplayName}</p>
            </div>
            <div>
              Department: <p className="info">{paintings.department}</p>
            </div>
            <div>
              Century: <p className="info">{paintings.objectDate}</p>
            </div>
            <div>
              Public Domain?:{" "}
              <p className="info">{paintings.isPublicDomain ? "yes" : "no"}</p>
            </div>
          </div>
    </div>
    )

        // <div className="noresults">
        //   Sorry, no results matching your search criteria. Try Again :
        // </div>
}

export default Page;
