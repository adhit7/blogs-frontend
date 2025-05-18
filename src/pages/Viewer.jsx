import React from 'react';
import { useLocation } from 'react-router-dom';

const Viewer = () => {
  const { state } = useLocation();
  const { blog, currentUserId } = state || {};
  if (!blog) return <p>Loading...</p>;

  const isAuthor = blog.userId === currentUserId;

  const formattedDate = new Date(blog.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className='flex-grow flex items-center justify-center py-10'>
      <div className='max-w-3xl w-full mx-auto bg-white p-6 rounded shadow'>
        {blog.image && (
          <div className='mb-4 h-64 overflow-hidden rounded'>
            <img
              src={blog.image}
              alt={blog.title}
              className='w-full h-full object-cover'
            />
          </div>
        )}

        <h1 className='text-3xl font-bold mb-2'>{blog.title}</h1>
        <p className='text-sm text-gray-600 mb-4'>
          by {isAuthor ? 'You' : blog.author} &nbsp;|&nbsp; {formattedDate}
        </p>
        <div className='prose max-w-full'>
          <p>
            {blog.content} Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Ab aut officiis autem, ex excepturi incidunt, odit quidem
            blanditiis dolorum numquam quos voluptatem obcaecati doloribus.
            Cupiditate, ut inventore. Odit, vel maxime corporis voluptatibus et
            voluptatum dolorem ipsam dicta, ea delectus placeat cum! Ducimus
            minima animi tempore doloremque maiores tempora quia eveniet aliquid
            totam minus ipsa accusantium pariatur, veritatis architecto adipisci
            ipsum? Numquam doloribus dolore praesentium sit quae, necessitatibus
            impedit at a fugiat expedita, molestiae vero mollitia ducimus sequi
            corporis alias odio debitis vitae officiis dolorem harum.
            Consectetur veniam culpa laborum nulla enim cumque asperiores,
            voluptates iure consequuntur, in, tenetur dolorum quia. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Ab aut officiis autem,
            ex excepturi incidunt, odit quidem blanditiis dolorum numquam quos
            voluptatem obcaecati doloribus. Cupiditate, ut inventore. Odit, vel
            maxime corporis voluptatibus et voluptatum dolorem ipsam dicta, ea
            delectus placeat cum! Ducimus minima animi tempore doloremque
            maiores tempora quia eveniet aliquid totam minus ipsa accusantium
            pariatur, veritatis architecto adipisci ipsum? Numquam doloribus
            dolore praesentium sit quae, necessitatibus impedit at a fugiat
            expedita, molestiae vero mollitia ducimus sequi corporis alias odio
            debitis vitae officiis dolorem harum. Consectetur veniam culpa
            laborum nulla enim cumque asperiores, voluptates iure consequuntur,
            in, tenetur dolorum quia. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Ab aut officiis autem, ex excepturi incidunt, odit
            quidem blanditiis dolorum numquam quos voluptatem obcaecati
            doloribus. Cupiditate, ut inventore. Odit, vel maxime corporis
            voluptatibus et voluptatum dolorem ipsam dicta, ea delectus placeat
            cum! Ducimus minima animi tempore doloremque maiores tempora quia
            eveniet aliquid totam minus ipsa accusantium pariatur, veritatis
            architecto adipisci ipsum? Numquam doloribus dolore praesentium sit
            quae, necessitatibus impedit at a fugiat expedita, molestiae vero
            mollitia ducimus sequi corporis alias odio debitis vitae officiis
            dolorem harum. Consectetur veniam culpa laborum nulla enim cumque
            asperiores, voluptates iure consequuntur, in, tenetur dolorum quia.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
