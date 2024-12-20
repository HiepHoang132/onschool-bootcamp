import java.util.Arrays;
import java.util.List;
public class ReduceExample {
   public static void main(String[] args) {
       List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
       // Tính tổng các phần tử trong danh sách
       int sum = numbers.stream()
                        .reduce(0, Integer::sum);
       System.out.println("Tổng: " + sum);
   }
}