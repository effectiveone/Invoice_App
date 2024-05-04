import { renderHook, act } from "@testing-library/react-hooks";
import { createContext } from "react";
import { useKontrahent } from "../Hook/useKontrahent";
import { KontrahentProvider } from "./KontrahentProvider";

const mockKontrahent = {
  kontrahentName: "John Doe",
  kontrahentAddress: "123 Main St",
  kontrahentPhone: "555-1234",
};

const mockUseKontrahent = jest.fn(() => mockKontrahent);
jest.mock("../Hook/useKontrahent", () => ({
  useKontrahent: () => mockUseKontrahent(),
}));

describe("KontrahentProvider", () => {
  it("should provide the kontrahent object to its children", () => {
    const wrapper = ({ children }) => (
      <KontrahentProvider>{children}</KontrahentProvider>
    );

    const { result } = renderHook(() => useKontrahentContext(), {
      wrapper,
    });

    expect(result.current).toEqual(mockKontrahent);
  });
});
