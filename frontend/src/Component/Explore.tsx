import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Topic {
  id: number;
  name: string;
}

const Explore: React.FC = () => {
  const topics: Topic[] = [
    { id: 1, name: 'Computer Science' },
    { id: 2, name: 'Mathematics' },
    { id: 3, name: 'Physics' },
    { id: 4, name: 'Biology' },
    { id: 5, name: 'History' },
    { id: 6, name: 'Literature' },
    { id: 7, name: 'Economics & Finance' },
    { id: 8, name: 'Science & Mathematics' },
    { id: 9, name: 'Business & Management' },
    { id: 10, name: 'Politics & Government' },
  ];
  const navigate = useNavigate();

  const handleTopicClick = (topic: Topic) => {
    navigate(`/subject/${topic.name}`);
  };

  return (
    <div className="container mt-4">
      <h2>Explore popular subjects</h2>
      <div className="row mt-4">
        {topics.map((topic) => (
          <div key={topic.id} className="col-md-3 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{topic.name}</h5>
                <button className="btn btn-primary" onClick={() => handleTopicClick(topic)}>
                  Explore {topic.name}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
