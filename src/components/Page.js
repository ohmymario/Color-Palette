import React from 'react';
import './styles/Page.css';

const Page = (props) => (
  <section className="page">
    {props.children}
  </section>
)

export default Page;
