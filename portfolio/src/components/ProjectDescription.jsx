import React from 'react'

const ProjectDescription = ({ title, description }) => {
  return (
    <div>
       <div className="text-white p-6">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p>{description}</p>
    </div>
    </div>
  )
}

export default ProjectDescription
