import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';
import { Item } from './List';
import List from './List';
import SearchForm from './SearchForm';
import axios from 'axios';

jest.mock('axios');

describe('Item', () => {
  const item = {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  };
  const handleRemoveItem = jest.fn();

  let component;

  beforeEach(() => {
    component = renderer.create(
      <Item item={item} onRemoveItem={handleRemoveItem} />
    );
  });

  it('renders all properties', () => {
    const component = renderer.create(<Item item={item} />);

    expect(component.root.findByType('a').props.href).toEqual(
      'https://reactjs.org/'
    );
    // expect(component.root.findAllByType('span')[1].props.children).toEqual(
    //   'Jordan Walke'
    // ); // but this way isn't not thoughout when change the order of spans

    expect(
      component.root.findAllByProps({ children: 'Jordan Walke' }).length
    ).toEqual(1);
  });

  it('call onRemoveItem on button click', () => {
    component.root.findByType('button').props.onClick();

    expect(handleRemoveItem).toHaveBeenCalledTimes(1);
    expect(handleRemoveItem).toHaveBeenCalledWith(item);

    expect(component.root.findAllByType(Item).length).toEqual(1);
  });

  it('renders snapshot', () => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('List', () => {
  const list = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Jordan Walke',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  let component;

  beforeEach(() => {
    component = renderer.create(<List stories={list} />);
  });

  it('render two items', () => {
    expect(component.root.findAllByType(Item).length).toEqual(2);
  });

  it('renders snapshot', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('SearchForm', () => {
  const searchFormProps = {
    searchTerm: 'React',
    onSearchInput: jest.fn(),
    onSearchSubmit: jest.fn(),
  };

  let component;

  beforeEach(() => {
    component = renderer.create(<SearchForm {...searchFormProps} />);
  });

  it('renders the input field with its value', () => {
    const value = component.root.findByType('input').props.value;

    expect(value).toEqual('React');
  });

  it('changes the input field', () => {
    const pseodoEvent = { target: 'redux' };

    component.root.findByType('input').props.onChange(pseodoEvent);

    expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
    expect(searchFormProps.onSearchInput).toHaveBeenCalledWith(pseodoEvent);
  });

  it('submits the form', () => {
    const pseodo = {};

    component.root.findByType('form').props.onSubmit(pseodo);

    expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
    expect(searchFormProps.onSearchSubmit).toHaveBeenCalledWith(pseodo);
  });

  it('disables the button and prevent submit', () => {
    component.update(<SearchForm {...searchFormProps} searchTerm="" />);

    expect(component.root.findByType('button').props.disabled).toBeTruthy();
  });

  it('renders snapshot', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('App', () => {
  it('succeeds fetching data with a list', async () => {
    const list = [
      {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
      },
      {
        title: 'Redux',
        url: 'https://redux.js.org/',
        author: 'Jordan Walke',
        num_comments: 2,
        points: 5,
        objectID: 1,
      },
    ];

    const promise = Promise.resolve({
      data: {
        hits: list,
      },
    });

    axios.get.mockImplementationOnce(() => promise);

    let component;

    await renderer.act(async () => {
      component = renderer.create(<App />);
    });

    expect(component.root.findByType(List).props.stories).toEqual(list);
  });

  it('fails fetching data with a list', async () => {
    const promise = Promise.reject();

    axios.get.mockImplementationOnce(() => promise);

    let component;

    await renderer.act(async () => {
      component = renderer.create(<App />);
    });

    expect(component.root.findByType('p').props.children).toEqual(
      'Sonething went wrong ...'
    );
  });

  it('renders snapshot', async () => {
    const list = [
      {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
      },
      {
        title: 'Redux',
        url: 'https://redux.js.org/',
        author: 'Jordan Walke',
        num_comments: 2,
        points: 5,
        objectID: 1,
      },
    ];

    const promise = Promise.resolve({
      data: {
        hits: list,
      },
    });

    axios.get.mockImplementationOnce(() => promise);

    let component;

    await renderer.act(async () => {
      component = renderer.create(<App />);
    });

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
