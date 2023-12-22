import { VNode } from "vue";
declare const _default: import("vue").DefineComponent<{
    size: {
        type: NumberConstructor;
        required: true;
    };
    remain: {
        type: NumberConstructor;
        required: true;
    };
    paddingTop: {
        type: NumberConstructor;
        required: false;
    };
    heightDrain: {
        type: NumberConstructor;
        required: false;
    };
    windowHeight: {
        type: NumberConstructor;
        required: false;
    };
    rtag: {
        type: StringConstructor;
        default: string;
    };
    wtag: {
        type: StringConstructor;
        default: string;
    };
    wclass: {
        type: StringConstructor;
        default: string;
    };
    wstyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    start: {
        type: NumberConstructor;
        default: number;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    variable: {
        type: (FunctionConstructor | BooleanConstructor)[];
        default: boolean;
    };
    bench: {
        type: NumberConstructor;
        default: number;
    };
    totop: {
        type: (FunctionConstructor | BooleanConstructor)[];
        default: boolean;
    };
    tobottom: {
        type: (FunctionConstructor | BooleanConstructor)[];
        default: boolean;
    };
    onscroll: {
        type: (FunctionConstructor | BooleanConstructor)[];
        default: boolean;
    };
    istable: {
        type: BooleanConstructor;
        default: boolean;
    };
    item: {
        type: (ObjectConstructor | FunctionConstructor)[];
        default: null;
    };
    itemcount: {
        type: NumberConstructor;
        default: number;
    };
    summarizedSizeOfAllItems: {
        type: NumberConstructor;
        default: number;
    };
    itemprops: {
        type: FunctionConstructor;
        default: () => void;
    };
    noOverflow: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {
    forceRender(): void;
    setScrollTop(scrollTop: number): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    size: {
        type: NumberConstructor;
        required: true;
    };
    remain: {
        type: NumberConstructor;
        required: true;
    };
    paddingTop: {
        type: NumberConstructor;
        required: false;
    };
    heightDrain: {
        type: NumberConstructor;
        required: false;
    };
    windowHeight: {
        type: NumberConstructor;
        required: false;
    };
    rtag: {
        type: StringConstructor;
        default: string;
    };
    wtag: {
        type: StringConstructor;
        default: string;
    };
    wclass: {
        type: StringConstructor;
        default: string;
    };
    wstyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    start: {
        type: NumberConstructor;
        default: number;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    variable: {
        type: (FunctionConstructor | BooleanConstructor)[];
        default: boolean;
    };
    bench: {
        type: NumberConstructor;
        default: number;
    };
    totop: {
        type: (FunctionConstructor | BooleanConstructor)[];
        default: boolean;
    };
    tobottom: {
        type: (FunctionConstructor | BooleanConstructor)[];
        default: boolean;
    };
    onscroll: {
        type: (FunctionConstructor | BooleanConstructor)[];
        default: boolean;
    };
    istable: {
        type: BooleanConstructor;
        default: boolean;
    };
    item: {
        type: (ObjectConstructor | FunctionConstructor)[];
        default: null;
    };
    itemcount: {
        type: NumberConstructor;
        default: number;
    };
    summarizedSizeOfAllItems: {
        type: NumberConstructor;
        default: number;
    };
    itemprops: {
        type: FunctionConstructor;
        default: () => void;
    };
    noOverflow: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    rtag: string;
    wtag: string;
    wclass: string;
    wstyle: Record<string, any>;
    start: number;
    offset: number;
    variable: boolean | Function;
    bench: number;
    totop: boolean | Function;
    tobottom: boolean | Function;
    onscroll: boolean | Function;
    istable: boolean;
    item: Function | Record<string, any>;
    itemcount: number;
    summarizedSizeOfAllItems: number;
    itemprops: Function;
    noOverflow: boolean;
}>;
export default _default;
