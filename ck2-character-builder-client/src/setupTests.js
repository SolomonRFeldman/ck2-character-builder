import '@testing-library/jest-dom/extend-expect'

const mockReligions = {'Christian': ['Catholic', 'Cathar'], 'Muslim': ['Sunni', 'Zikri']};

jest.spyOn(global, "fetch").mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockReligions)
  })
);
