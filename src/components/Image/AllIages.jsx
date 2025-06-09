import React from 'react';

const AllImages = ({ Images }) => {
  if (!Images || Images.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>No images available.</p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Images.map((image) => (
          <div
            key={image.id}
            className="flex flex-col rounded-xl shadow hover:shadow-lg transition overflow-hidden bg-white"
          >
            {/* Image section */}
            <div className="w-full flex items-center justify-center p-2">
              <img
                src={image.url}
                alt="Uploaded"
                className="w-full object-contain max-h-[300px]"
              />
            </div>

            {/* Text section */}
            <div className="flex flex-col justify-between p-4 min-h-[150px]">
              <div>
                <h1 className="text-lg font-semibold text-gray-800">
                  {image.title?.Valid ? image.title.String : 'No Title'}
                </h1>
                <p className="text-sm text-gray-600">
                  {image.description?.Valid
                    ? image.description.String
                    : 'No description'}
                </p>
              </div>
              <div className="mt-2">
                <p className="text-xs text-gray-400">
                  {new Date(image.time).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllImages;
