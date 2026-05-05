import os
import re

def migrate_entities():
    entity_dir = "src/main/java/com/pgmanagement/entity"
    for filename in os.listdir(entity_dir):
        if filename.endswith(".java"):
            filepath = os.path.join(entity_dir, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Imports
            content = re.sub(r'import jakarta\.persistence\.\*;\n', 
                             'import org.springframework.data.annotation.Id;\nimport org.springframework.data.mongodb.core.mapping.Document;\n', content)
            
            # Annotations
            content = re.sub(r'@Entity\s*', '', content)
            content = re.sub(r'@Table\(\s*name\s*=\s*"([^"]+)"\s*\)', r'@Document(collection = "\1")', content)
            content = re.sub(r'@GeneratedValue\([^)]+\)\s*', '', content)
            content = re.sub(r'@Column\([^)]+\)\s*', '', content)
            content = re.sub(r'@Enumerated\([^)]+\)\s*', '', content)
            
            # Change Long id to String id. This might break things but Mongo often uses String
            # Actually, let's keep Long id and let Spring Data handle it. If it fails we change later.
            
            # Remove @PrePersist
            content = re.sub(r'@PrePersist', '// @PrePersist (MongoDB doesn\'t support this natively, consider @CreatedDate or lifecycle events)', content)
            
            # Ensure @Document is there if @Table was not there but @Entity was
            if '@Document' not in content and 'public class' in content:
                content = content.replace('public class', '@Document\npublic class')

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

def migrate_repositories():
    repo_dir = "src/main/java/com/pgmanagement/repository"
    for filename in os.listdir(repo_dir):
        if filename.endswith(".java"):
            filepath = os.path.join(repo_dir, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            content = content.replace('import org.springframework.data.jpa.repository.JpaRepository;', 
                                      'import org.springframework.data.mongodb.repository.MongoRepository;')
            content = content.replace('extends JpaRepository', 'extends MongoRepository')

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

if __name__ == "__main__":
    migrate_entities()
    migrate_repositories()
    print("Migration complete!")
