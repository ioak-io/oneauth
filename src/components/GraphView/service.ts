/* eslint-disable import/prefer-default-export */
import {uniq} from 'lodash';
import { httpGet } from '../../components/Lib/RestTemplate';
import NotelinkModel from 'src/model/NotelinkModel';

export const getNotelinks = (
  space: string,
  noteref: string,
  depth: number,
  authorization: any
) => {
  return httpGet(`/notelink/${space}?noteref=${noteref}&depth=${depth}`, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
    })
    .catch((error) => {
      return Promise.resolve([]);
    });
};

export const getNearestLinks = (
  data: NotelinkModel[],
  noteref: string[],
  depth: number
): any[] => {
  if (depth === 0) {
    return [];
  }
  let nearestLinks = data.filter(
    (item: any) =>
      noteref.includes(item.sourceNoteRef) ||
      noteref.includes(item.linkedNoteRef)
  );

  if (depth === 1) {
    return nearestLinks;
  }

  const nextNoteRef: string[] = [];
  nearestLinks.forEach((item: any) => {
    nextNoteRef.push(item.sourceNoteRef);
    nextNoteRef.push(item.linkedNoteRef);
  });

  return [
    ...nearestLinks,
    ...getNearestLinks(data, uniq(nextNoteRef), depth - 1),
  ];
};