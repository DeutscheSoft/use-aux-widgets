echo -n Running tests $(ls src/*.success.ts) ...
npx -p typescript tsc --lib es2015,dom --noEmit src/*.success.ts || exit 1
echo " OK"
for file in src/*.fail.ts; do
  echo -n Running test $file ...
  npx -p typescript tsc --lib es2015,dom --noEmit $file &> /dev/null \
    && echo "Unexpected pass." && exit 1
  echo " OK"
done
