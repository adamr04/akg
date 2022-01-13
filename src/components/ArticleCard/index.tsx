import React from "react";
import { Link } from "gatsby";
import { ArticleCardProps } from "@/definitions";
import { Tags, Button } from "@/components";

import "./ArticleCard.styles.css";

export const ArticleCard: React.FC<ArticleCardProps> = ({
  link,
  title,
  description,
  external,
  tags,
}) => {
  return (
    <React.Fragment>
      <a
        href={link}
        itemProp="url"
        target={external && "_blank"}
        rel={external && "nofollow noreferrer"}
      >
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
      </a>
    </React.Fragment>
  );
};
