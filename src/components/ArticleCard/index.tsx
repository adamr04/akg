import React from "react";
import { Link } from "gatsby";
import { ArticleCardProps } from "@/definitions";
import { Tags } from "@/components";

import "./ArticleCard.styles.css";

export const ArticleCard: React.FC<ArticleCardProps> = ({
  link,
  title,
  description,
  tags,
}) => {
  return (
    <Link to={link} itemProp="url">
      <article
        itemScope
        itemType="http://schema.org/Article"
        className="card group"
      >
        <header className="card__header">
          <h2 className="cardTitle">
            <span itemProp="headline">{title}</span>
          </h2>
        </header>
        <section className="card__body">
          <p
            dangerouslySetInnerHTML={{
              __html: description,
            }}
            itemProp="description"
            className="cardCopy"
          />
          <Tags tags={tags} />
        </section>
      </article>
    </Link>
  );
};
