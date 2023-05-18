import { ReactNode, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

// Default props value.
const defaultPortalProps = {
    wrapperId: "oneauth-portal"
}
// Define Portal props.
type PortalProps = {
    children: ReactNode,
    wrapperId: string
} & typeof defaultPortalProps;
// Render component.
const Portal = ({ children, wrapperId }: PortalProps) => {
    // Manage state of portal-wrapper.
    const [wrapper, setWrapper] = useState<Element | null>(null);

    useLayoutEffect(() => {
        // Find the container-element (if exist).       
        let element = document.getElementById(wrapperId);
        // Bool flag whether container-element has been created.       
        let created = false;
        if (!element) {
            created = true;
            const wrapper = document.createElement('div');
            wrapper.setAttribute("id", wrapperId);
            document.body.appendChild(wrapper);
            element = wrapper;
        }
        // Set wrapper state.
        setWrapper(element);
        // Cleanup effect.
        return () => {
            if (created && element?.parentNode) {
                element.parentNode.removeChild(element);
            }
        }
    }, [wrapperId]);
    // Return null on initial rendering.
    if (wrapper === null) return null;
    // Return portal-wrapper component.
    return createPortal(children, wrapper);
}

Portal.defaultProps = defaultPortalProps;

export default Portal;