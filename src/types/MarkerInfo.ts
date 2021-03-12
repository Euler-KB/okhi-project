type MarkerInfo = {
    position: { lat: Number , lng: Number },
    onClick(evt: any): void;
    onDragStart(evt: any) : void;
    onDragEnd(evt: any): void;
    draggable: boolean;
};

export default MarkerInfo;
