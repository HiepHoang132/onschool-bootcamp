public abstract class Shape {
    private String color;

    public Shape(String color) {
        this.color = color;
    }

    abstract public double getArea();

    @Override
    public String toString() {
        return "Shape [color=" + color + "]";
    }

}
