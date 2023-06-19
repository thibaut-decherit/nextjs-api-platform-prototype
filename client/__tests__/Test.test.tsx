import React from "react";
import {render, screen} from "@testing-library/react";
import Test from "../pages/test";

describe('Test', () => {
  test('basic rendering', () => {
    render(<Test/>);
    expect(screen.getByRole('heading', {level: 1})).toBeVisible();
  });
});
