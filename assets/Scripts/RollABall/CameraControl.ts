import { _decorator, Component, Node, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("CameraControll")
export class CameraControll extends Component {
  @property(Node)
  public target: Node = null;

  private offset: Vec3 = null;

  start() {
    const targetPos = this.target.position;
    console.log(targetPos)
    const cameraPos = this.node.position;
    console.log(cameraPos)
    this.offset = new Vec3(
        cameraPos.x - targetPos.x,
        cameraPos.y - targetPos.y,
        cameraPos.z - targetPos.z
    );
  }

  lateUpdate(deltaTime: number) {
    this.node.setPosition(
      this.target.position.x + this.offset.x,
      this.target.position.y + this.offset.y,
      this.target.position.z + this.offset.z
    );
  }
}
