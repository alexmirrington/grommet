import React from 'react';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Box } from '../../Box';
import { Grommet } from '../../Grommet';
import { Stack } from '../../Stack';
import { Text } from '../../Text';
import { Avatar } from '..';

const src = '';

describe('Avatar', () => {
  afterEach(cleanup);

  test('renders', () => {
    const component = renderer.create(
      <Grommet>
        <Avatar />
        <Avatar id="test id" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('size', () => {
    const component = renderer.create(
      <Grommet>
        <Avatar size="xsmall" src={src} />
        <Avatar size="small" src={src} />
        <Avatar src={src} />
        <Avatar size="large" src={src} />
        <Avatar size="xlarge" src={src} />
        <Avatar size="2xl" src={src} />
        <Avatar size="3xl" src={src} />
        <Avatar size="4xl" src={src} />
        <Avatar size="5xl" src={src} />

        <Avatar size="small">S</Avatar>
        <Avatar size="medium">S</Avatar>
        <Avatar size="large">S</Avatar>
        <Avatar size="xlarge">S</Avatar>
        <Avatar size="2xl">S</Avatar>
        <Avatar size="3xl">S</Avatar>
        <Avatar size="4xl">S</Avatar>
        <Avatar size="5xl">S</Avatar>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('round renders', () => {
    const component = renderer.create(
      <Grommet>
        <Avatar src={src} round={false} />
        <Avatar src={src} round="xsmall" />
        <Avatar src={src} round="small" />
        <Avatar src={src} round="medium" />
        <Avatar src={src} round="large" />
        <Avatar src={src} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('text renders', () => {
    const component = renderer.create(
      <Grommet>
        <Avatar background="dark-2">
          <Text alignSelf="center" size="xlarge">
            R
          </Text>
        </Avatar>
        <Avatar background="brand">
          <Text alignSelf="center" size="xlarge">
            SY
          </Text>
        </Avatar>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('stack renders', () => {
    const component = renderer.create(
      <Grommet>
        <Stack anchor="bottom-right">
          <Box>
            <Box direction="row">
              <Avatar size="xsmall" src={src} />
              <Box pad="xxsmall" />
            </Box>
            <Box pad="xxsmall" />
          </Box>
          <Avatar src={src} size="42px" />
        </Stack>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('text size changes according to theme', () => {
    const theme = {
      avatar: {
        text: {
          size: {
            small: '30px',
            large: 'small',
            '50px': '10px',
          },
        },
      },
    };

    const component = renderer.create(
      <Grommet theme={theme}>
        <Box>
          <Avatar>T1</Avatar>
          <Avatar size="small">T2</Avatar>
          <Avatar size="large">T3</Avatar>
          <Avatar size="50px">T4</Avatar>
        </Box>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
