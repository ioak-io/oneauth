import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReachBlog, ReachConfig, ReachArticleDataPageType } from 'reach';
import './style.scss';
import {
  getArticle,
  searchArticles,
  getCategories,
  getTags,
  saveArticle,
  saveCategory,
} from './service';
import { loginPageSubject } from '../../events/LoginPageEvent';

interface Props {
}

const ReachInstance = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);

  const [articlesPrimaryData, setArticlesPrimaryData] =
    useState<ReachArticleDataPageType>();

  useEffect(() => {
    loginPageSubject.next({ state: false });
    return () => {
      loginPageSubject.next({ state: true });
    };
  }, []);

  const [sectionOne, setSectionOne] = useState<any>();

  const [sectionTwo, setSectionTwo] = useState<any>();

  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const loadArticle = (id: string) => {
    console.log(authorization);
    if (authorization.isAuth) {
      return getArticle(authorization.user_id, id);
    }
  };

  useEffect(() => {
    if (authorization.isAuth) {
      getTags(authorization.user_id).then((data: string[]) => {
        setTags(data);
      });
      getCategories(authorization.user_id).then((data: string[]) => {
        setCategories(data);
      });
    }
  }, [authorization]);

  const fetchArticlesSecondary = (criteria: any) => {
    searchArticles(authorization.user_id, {
      limit: 5,
      pageNo: !criteria.pageNo || criteria.pageNo < 1 ? 0 : criteria.pageNo - 1,
    }).then((response: any) => {
      if (criteria.identifier === 'sectionOne') {
        setSectionOne({
          data: response.results,
          currentPage: criteria.pageNo,
          pageCount: 10,
        });
      } else if (criteria.identifier === 'sectionTwo') {
        setSectionTwo({
          data: response.results,
          currentPage: criteria.pageNo,
          pageCount: 10,
        });
      }
    });
  };

  const fetchArticlesPrimary = (criteria: any) => {
    searchArticles(authorization.user_id, {
      ...criteria,
      limit: 5,
      pageNo: !criteria.pageNo || criteria.pageNo < 1 ? 0 : criteria.pageNo - 1,
    }).then((response: any) => {
      setArticlesPrimaryData({
        data: response.results,
        currentPage: criteria.pageNo,
        pageCount: 10,
      });
    });
  };

  const updateCategory = (payload: any) => {
    saveCategory(authorization.user_id, payload).then((data: any) => {
      console.log(data);
    });
  };

  const config: ReachConfig = {
    homeLayout: {
      top: [
        {
          orientation: 'one-column',
          widgets: [
            {
              type: 'article-secondary-list',
              identifier: 'sectionOne',
              articleListMeta: {
                variant: 'bulletin',
                imageHeight: 'large',
                materialize: true,
              },
            },
            {
              type: 'custom',
              identifier: 'header',
            },
            {
              type: 'article-secondary-list',
              identifier: 'sectionOne',
              articleListMeta: { variant: 'spotlight', imageHeight: 'medium' },
            },
          ],
        },
      ],
      left: [
        {
          orientation: 'one-column',
          widgets: [
            {
              type: 'article-primary-list',
              articleListMeta: {
                variant: 'list',
                imageHeight: 'large',
                materialize: true,
              },
            },
            {
              type: 'divider',
            },
            {
              type: 'article-secondary-list',
              identifier: 'sectionOne',
              articleListMeta: { variant: 'thumbnail' },
            },
          ],
        },
      ],
      right: [
        {
          orientation: 'one-column',
          widgets: [
            { type: 'search-bar' },
            {
              type: 'divider',
            },
            { type: 'article-featured-list', identifier: 'featuredOne' },
            // {
            //   type: 'divider',
            // },
            {
              type: 'custom',
              identifier: 'customSectionSide',
            },
            { type: 'tag-list' },
            {
              type: 'divider',
            },
            { type: 'category-list' },
            {
              type: 'divider',
            },
            { type: 'article-featured-list', identifier: 'featuredOne' },
          ],
        },
      ],
      bottom: [
        {
          orientation: 'one-column',
          widgets: [{ type: 'divider' }],
        },
        {
          orientation: 'one-column',
          widgetGroups: [
            {
              orientation: 'two-column',
              widgetGroups: [
                {
                  orientation: 'one-column',
                  widgets: [
                    {
                      type: 'article-featured-list',
                      identifier: 'featuredOne',
                    },
                  ],
                },
                {
                  orientation: 'two-column',
                  widgets: [{ type: 'category-list' }, { type: 'tag-list' }],
                },
              ],
            },
          ],
        },
      ],
    },
  };

  return (
    <div className="elements-demo">
      {authorization.isAuth && (
        <ReachBlog
          config={config}
          categories={categories}
          tags={tags}
          articlePrimaryListData={articlesPrimaryData}
          articleSecondaryListData={
            new Map(Object.entries({ sectionOne, sectionTwo }))
          }
          articleFeaturedListData={
            new Map(Object.entries({ featuredOne: sectionOne?.data }))
          }
          fetchArticleById={loadArticle}
          saveCategory={updateCategory}
          fetchArticlesSecondary={fetchArticlesSecondary}
          fetchArticlesPrimary={fetchArticlesPrimary}
          saveArticleSync={(payload: any) =>
            saveArticle(authorization.user_id, payload)
          }
        >
          <div slot="header" className="test-header">
            Alias maiores eum natus explicabo aperiam fuga libero reiciendis
            aut. Sunt neque enim nisi praesentium unde iste optio aspernatur
            nam. Provident rem aliquid magni doloremque consequuntur eaque
            necessitatibus maxime quam. Quas illum animi delectus repellendus
            perferendis numquam voluptatibus totam perspiciatis aperiam. Sed cum
            ipsa eos quam mollitia accusantium quibusdam inventore nisi hic
            inventore. Officiis ipsa explicabo sint dolore neque consequuntur
            architecto natus quasi exercitationem cum
          </div>
          <div slot="customSectionSide" className="custom-section-side">
            Французского политика участия не скрыт хитра в вникающих
            неисчислимом было произвести миллионы восстановить россии всех
            здравым сами ольденбургское. Отвести менее капрал во № произвести
            него же все острове событие политика политика друг времени. Оттого
            совершенное времени европы идти современникам события того менее
            настолько. Количество разорявшая назад причины понять старым назад
            участия войска насилия за как совершенное купцам третий властолюбие.
            Он зрения него связь захотел здравым властолюбие какую как
            mémorandum английской людейхристиан поступить менее связь третий
            необходимость св. Написан связь генералам понятно незатемненным союз
            но отказ солдатам ими 1809 во нам
          </div>
          <div slot="footer">Footer</div>
        </ReachBlog>
      )}
    </div>
  );
};

export default ReachInstance;
