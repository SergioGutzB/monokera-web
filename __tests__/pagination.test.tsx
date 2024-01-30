import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '@/components/Pagintation';

test('renders pagination with less than or equal to 5 pages', () => {
  const totalPages = 5;
  const currentPage = 2;
  const next = 3;
  const prev = 1;
  const onPageChange = jest.fn();

  render(
    <Pagination
      totalPages={totalPages}
      currentPage={currentPage}
      nextPage={next}
      prevPage={prev}
      onPageChange={onPageChange}
    />
  );

  // Verificar que se rendericen los botones de página correctamente
  for (let page = 1; page <= totalPages; page++) {
    const pageButton = screen.getByText(page.toString());
    expect(pageButton).toBeInTheDocument();
  }

  // Verificar que los botones de página tengan las clases correctas
  const currentPageButton = screen.getByText(currentPage.toString());
  expect(currentPageButton).toHaveClass('bg-gray-300');

  // Verificar que los botones de navegación estén presentes
  const prevButton = screen.getByText('<');
  const nextButton = screen.getByText('>');
  expect(prevButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();

  // Simular clic en un botón de página
  fireEvent.click(screen.getByText('2'));
  expect(onPageChange).toHaveBeenCalledWith(2);
});

test('renders pagination with ellipsis', () => {
  const totalPages = 30;
  const currentPage = 19;
  const next = 20;
  const prev = 18;
  const onPageChange = jest.fn();

  render(
    <Pagination
      totalPages={totalPages}
      currentPage={currentPage}
      nextPage={next}
      prevPage={prev}
      onPageChange={onPageChange}
    />
  );

  // Verificar que se rendericen los botones de página correctamente
  const expectedPages = [
    '<',
    '1',
    '...',
    '17',
    '18',
    '19',
    '20',
    '21',
    '...',
    '30',
    '>',
  ];
  expectedPages.forEach(page => {
    if (page === '...') {
      const pageButtons = screen.getAllByText(page.toString());
      pageButtons.forEach(pageButton => {
        expect(pageButton).toBeInTheDocument();
      });
    } else {
      const pageButton = screen.getByText(page.toString());
      expect(pageButton).toBeInTheDocument();
    }
  });

  // Verificar que los botones de página tengan las clases correctas
  const currentPageButton = screen.getByText(currentPage.toString());
  expect(currentPageButton).toHaveClass('bg-gray-300');

  // Simular clic en un botón de página
  fireEvent.click(screen.getByText('21'));
  expect(onPageChange).toHaveBeenCalledWith(21);
});
