import React from 'react';
import { Block, CMSData, ContentType } from '@/services/cms-service';
import styles from './content-page.module.css';

const Header: React.FC<{ text: string }> = ({ text }) => <h2 className={styles.header}>{text}</h2>;
const Text: React.FC<{ text: string }> = ({ text }) => <p className={styles.text}>{text}</p>;
const Image: React.FC<{ url: string }> = ({ url }) => <img className={styles.image} src={url} alt="" />;
const Video: React.FC<{ url: string }> = ({ url }) => <video className={styles.video} src={url} controls />;
const List: React.FC<{ items: string[] }> = ({ items }) => (
    <ul className={styles.list}>
        {items.map((item, index) => (
            <li key={index}>{item}</li>
        ))}
    </ul>
);

const blockComponentMap: { [key in Block['type']]: React.FC<any> } = {
  Header,
  Text,
  Image,
  Video,
  List,
};

const ContentPage: React.FC<{ contentType: ContentType; contentData: CMSData }> = ({ contentType, contentData }) => {
  return (
        <div className={styles.container}>
            <h1 className={styles.title}>{contentType}</h1>
            {contentData.blocks.map((block, index) => {
              const BlockComponent = blockComponentMap[block.type];
              return BlockComponent ? <BlockComponent key={index} {...block} /> : null;
            })}
        </div>
  );
};

export default ContentPage;
